/**
 * Idea Validation Utilities for MAKE YOUR OWN Platform
 * Helps ensure ideas are clear and actionable
 */

class IdeaValidator {
  /**
   * Validates if an idea is well-formed enough to proceed
   */
  static validateIdea(idea) {
    const errors = [];
    
    // Check for basic fields
    if (!idea.title || typeof idea.title !== 'string' || idea.title.trim().length === 0) {
      errors.push('Idea must have a title');
    } else if (idea.title.trim().length > 100) {
      errors.push('Title should be less than 100 characters');
    }
    
    if (!idea.description || typeof idea.description !== 'string' || idea.description.trim().length === 0) {
      errors.push('Idea must have a description');
    } else if (idea.description.trim().length < 10) {
      errors.push('Description should be at least 10 characters');
    }
    
    // Check for clarity indicators
    const description = idea.description.toLowerCase();
    
    // Common vague phrases that don't give enough direction
    const vaguePhrases = [
      'something cool', 'a nice app', 'like facebook but different',
      'the next big thing', 'something amazing', 'a website',
      'an app that does things', 'like [popular service] but better'
    ];
    
    for (const phrase of vaguePhrases) {
      if (description.includes(phrase)) {
        errors.push(`Description contains vague phrase: "${phrase}". Please be more specific.`);
      }
    }
    
    // Check if the idea is too complex for initial implementation
    const complexityKeywords = [
      'ai', 'machine learning', 'blockchain', 'vr', 'ar', 'iot',
      'neural network', 'quantum computing', 'deep learning'
    ];
    
    let complexityCount = 0;
    for (const keyword of complexityKeywords) {
      if (description.includes(keyword)) {
        complexityCount++;
      }
    }
    
    if (complexityCount > 2) {
      // Not an error, just a warning
      return {
        isValid: errors.length === 0,
        errors,
        warnings: ['This idea might be quite complex. Consider starting with a simpler version.']
      };
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings: []
    };
  }
  
  /**
   * Suggest improvements to an idea
   */
  static suggestImprovements(idea) {
    const suggestions = [];
    const description = idea.description.toLowerCase();
    
    // Check for missing components that are often important
    if (!description.includes('user') && !description.includes('people')) {
      suggestions.push('Consider specifying who will use your creation and how.');
    }
    
    if (!description.includes('problem') && !description.includes('need')) {
      suggestions.push('Describe what problem your idea solves or what need it fulfills.');
    }
    
    if (!description.includes('feature') && !description.includes('function') && !description.includes('work')) {
      suggestions.push('Explain what your creation will do or what features it will have.');
    }
    
    // Check if the description is too short
    if (idea.description.length < 50) {
      suggestions.push('Try adding more details about how your creation will work.');
    }
    
    return suggestions;
  }
  
  /**
   * Normalize an idea object
   */
  static normalizeIdea(idea) {
    return {
      title: idea.title?.trim() || '',
      description: idea.description?.trim() || '',
      category: idea.category?.trim() || 'general',
      targetUsers: idea.targetUsers?.trim() || 'general audience',
      keyFeatures: Array.isArray(idea.keyFeatures) ? idea.keyFeatures : [],
      inspiration: idea.inspiration?.trim() || ''
    };
  }
}

module.exports = IdeaValidator;