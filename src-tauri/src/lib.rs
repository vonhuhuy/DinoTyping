mod models;
mod words;

use std::sync::Mutex;
use tauri::State;
use models::{CategoryInfo, SessionStats, ValidationResult, WordItem};
use words::WordStore;

pub struct AppState {
    pub word_store: WordStore,
    pub session_stats: Mutex<SessionStats>,
}

#[tauri::command]
fn get_categories(state: State<AppState>) -> Vec<CategoryInfo> {
    state.word_store.get_categories()
}

#[tauri::command]
fn get_round_words(state: State<AppState>, category: String, count: Option<usize>) -> Vec<WordItem> {
    let card_count = count.unwrap_or(10);
    state.word_store.get_round_deck(&category, card_count)
}

#[tauri::command]
fn check_word(state: State<AppState>, target: String, input: String) -> ValidationResult {
    state.word_store.check_word(&target, &input)
}

#[tauri::command]
fn add_custom_word(state: State<AppState>, word: String, hint: Option<String>) -> Result<WordItem, String> {
    state.word_store.add_custom_word(&word, hint)
}

#[tauri::command]
fn get_custom_words(state: State<AppState>) -> Vec<WordItem> {
    state.word_store.get_words_for_category("custom")
}

#[tauri::command]
fn record_attempt(state: State<AppState>, is_correct: bool) -> SessionStats {
    let mut stats = state.session_stats.lock().unwrap();
    stats.total_attempted += 1;
    if is_correct {
        stats.total_correct += 1;
        stats.current_streak += 1;
        if stats.current_streak > stats.best_streak {
            stats.best_streak = stats.current_streak;
        }
    } else {
        stats.total_incorrect += 1;
        stats.current_streak = 0;
    }
    stats.clone()
}

#[tauri::command]
fn get_session_stats(state: State<AppState>) -> SessionStats {
    let stats = state.session_stats.lock().unwrap();
    stats.clone()
}

#[tauri::command]
fn reset_session_stats(state: State<AppState>) -> SessionStats {
    let mut stats = state.session_stats.lock().unwrap();
    *stats = SessionStats::default();
    stats.clone()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app_state = AppState {
        word_store: WordStore::new(),
        session_stats: Mutex::new(SessionStats::default()),
    };

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            get_categories,
            get_round_words,
            check_word,
            add_custom_word,
            get_custom_words,
            record_attempt,
            get_session_stats,
            reset_session_stats
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
