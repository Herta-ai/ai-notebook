pub mod models;
pub mod db;
pub mod commands;

use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let db = tauri::async_runtime::block_on(async {
                db::init().await
            }).expect("failed to initialize database");
            
            app.manage(db);
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            commands::get_current_user,
            commands::update_current_user
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
