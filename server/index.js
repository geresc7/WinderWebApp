import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Configure CORS
app.use(cors());

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type for ${file.originalname}. Only PDF and Word documents are allowed.`));
    }
  }
});

// Ensure data directory exists
const dataDir = join(__dirname, 'data');
try {
  await fs.mkdir(dataDir, { recursive: true });
} catch (error) {
  console.error('Failed to create data directory:', error);
}

const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
};

const extractTextFromDOCX = async (buffer) => {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    throw new Error(`Failed to parse Word document: ${error.message}`);
  }
};

const extractCandidateInfo = (text) => {
  // Basic information extraction
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phonePattern = /\b\d{10,}\b/;
  const namePattern = /^([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/m;

  const email = text.match(emailPattern)?.[0] || '';
  const phone = text.match(phonePattern)?.[0] || '';
  const fullName = text.match(namePattern)?.[0] || 'Unknown Name';
  const [name, ...surnames] = fullName.split(' ');

  // Extract sections using common headers
  const sections = text.split(/\n(?=[A-Z][A-Z\s]+:)/);
  
  const findSection = (keywords) => {
    const section = sections.find(s => 
      keywords.some(keyword => 
        s.toUpperCase().startsWith(keyword.toUpperCase())
      )
    );
    return section ? section.split(':')[1].trim() : '';
  };

  const education = findSection(['EDUCATION', 'ACADEMIC BACKGROUND', 'QUALIFICATIONS']);
  const experience = findSection(['EXPERIENCE', 'WORK HISTORY', 'EMPLOYMENT']);
  const skills = findSection(['SKILLS', 'TECHNICAL SKILLS', 'COMPETENCIES']);

  const skillsList = skills
    .split(/[,;\n]/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  return {
    name: name || 'Unknown',
    surnames: surnames.join(' ') || 'Unknown',
    dateBirth: Date.now() - 25 * 365 * 24 * 60 * 60 * 1000, // Placeholder
    city: 'Not specified',
    country: 'Not specified',
    phoneNumber: parseInt(phone) || 0,
    email,
    studies: [{
      school: education.split('\n')[0] || 'Not specified',
      title: education.split('\n')[1] || 'Not specified',
      startDate: Date.now() - 4 * 365 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 1 * 365 * 24 * 60 * 60 * 1000
    }],
    workHistory: [{
      company: experience.split('\n')[0] || 'Not specified',
      position: experience.split('\n')[1] || 'Not specified',
      startDate: Date.now() - 2 * 365 * 24 * 60 * 60 * 1000,
      endDate: Date.now(),
      description: experience
    }],
    softSkills: ['Communication', 'Teamwork'],
    hardSkills: skillsList.length > 0 ? skillsList : ['Not specified'],
    languages: [{ language: 'English', level: 'Not specified', certificate: '' }],
    aboutMe: text.slice(0, 200).trim(),
    image: null
  };
};

app.post('/api/analyze-cvs', upload.array('cvFiles'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const results = [];
    const warnings = [];
    
    for (const file of req.files) {
      try {
        let text;
        if (file.mimetype === 'application/pdf') {
          text = await extractTextFromPDF(file.buffer);
        } else {
          text = await extractTextFromDOCX(file.buffer);
        }

        const candidateInfo = extractCandidateInfo(text);
        results.push(candidateInfo);
      } catch (error) {
        warnings.push(`Failed to process ${file.originalname}: ${error.message}`);
      }
    }

    if (results.length === 0) {
      return res.status(422).json({ 
        error: 'No CVs could be processed successfully',
        warnings 
      });
    }

    // Save results to JSON file
    const timestamp = Date.now();
    const filename = `candidates_${timestamp}.json`;
    await fs.writeFile(
      join(dataDir, filename),
      JSON.stringify(results, null, 2)
    );

    res.json({ 
      candidates: results,
      warnings: warnings.length > 0 ? warnings : undefined
    });
  } catch (error) {
    console.error('Error processing CVs:', error);
    res.status(500).json({ 
      error: 'Server error while processing CVs',
      message: error.message 
    });
  }
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Server error',
    message: err.message
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});