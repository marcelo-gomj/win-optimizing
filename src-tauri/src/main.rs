// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::command;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[command]
fn master() -> i32 {
    32
}

#[command]
fn corte_fino(level: i32) -> i32 {
  println!("{:?}", level);
    323
}

#[command]
fn check_service_actives(){ 
    let data = (322, 3232, 323, "jjeiew", 'd');
    let arr : [i128; 2] = [323, -3000000000000000000000000000000000];

    println!("{:?}", data);
    println!("{:?}", arr);
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      master,
      greet,
      corte_fino,
      check_service_actives
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
