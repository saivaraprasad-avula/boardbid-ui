// src/utils/validateCreative.js

export function validateCreative(file) {
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];
    const flaggedWords = ['nude', 'gamble', 'cigarette', 'adult'];
  
    const errors = [];
    const suggestions = [];
  
    // File type check
    if (!allowedTypes.includes(file.type)) {
      errors.push("Unsupported file type");
      suggestions.push("Use jpg, png or mp4 formats");
    }
  
    // Size check
    if (file.size > maxSizeBytes) {
      errors.push("File size exceeds 5MB");
      suggestions.push("Compress or resize your creative under 5MB");
    }
  
    // Flagged keyword check in filename
    const lowerName = file.name.toLowerCase();
    flaggedWords.forEach((word) => {
      if (lowerName.includes(word)) {
        errors.push(`Filename contains restricted word: ${word}`);
        suggestions.push("Rename your file to remove flagged terms");
      }
    });
  
    return {
      status: errors.length === 0 ? "approved" : "rejected",
      reasons: errors,
      suggestions,
    };
  }
  