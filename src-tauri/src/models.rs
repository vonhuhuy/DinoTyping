use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WordItem {
    pub id: String,
    pub word: String,
    pub phonetic: Option<String>,
    pub category: String,
    pub hint: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ValidationResult {
    pub is_correct: bool,
    pub target_word: String,
    pub user_input: String,
    pub feedback_message: String,
    pub similarity_percentage: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CategoryInfo {
    pub id: String,
    pub name: String,
    pub description: String,
    pub icon: String,
    pub word_count: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct SessionStats {
    pub total_attempted: u32,
    pub total_correct: u32,
    pub total_incorrect: u32,
    pub current_streak: u32,
    pub best_streak: u32,
}
