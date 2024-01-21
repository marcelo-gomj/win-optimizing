mod ls_process;
mod ls_services;

use ls_process::list_process;
use ls_services::list_service;

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{generate_context, generate_handler};

fn main() {
    tauri::Builder::default()
        .invoke_handler(generate_handler![list_service, list_process])
        .run(generate_context!())
        .expect("error while running tauri application");
}
