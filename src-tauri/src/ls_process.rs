use serde::Serialize;
use sysinfo::{ProcessExt, System, SystemExt};
use tauri::command;

#[derive(Serialize, Debug)]
pub struct ProcessProps {
    name: String,
    pid: String,
    path: String,
    exec_path: String,
    status: String,
    memory_used: u64,
    cpu_used: f32,
    parent: String,
}

#[command]
pub fn list_process() -> Vec<ProcessProps> {
    let system_info = System::new_all();
    let mut list_process: Vec<ProcessProps> = vec![];

    for (_pid, process) in system_info.processes() {
        let parent = match process.parent() {
            Some(e) => e.to_string(),
            None => "".to_string(),
        };

        list_process.push(ProcessProps {
            name: process.name().to_string(),
            pid: process.pid().to_string(),
            path: process.root().display().to_string(),
            exec_path: process.exe().display().to_string(),
            status: process.status().to_string(),
            parent,
            memory_used: process.memory(),
            cpu_used: process.cpu_usage(),
        });
    }

    list_process
}
