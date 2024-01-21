use std::process::Command;
use tauri::command;
use windows_service::service::{ServiceAccess, ServiceState::Running};
use windows_service::service_manager::{ServiceManager, ServiceManagerAccess};

use serde;

#[derive(serde::Serialize, Debug)]
pub struct ServiceProperties {
    name: String,
    id: u32,
    display_name: Box<str>,
    service_type: u32,
    exec_path: Box<str>,
}

#[command]
pub fn list_service() -> Vec<ServiceProperties> {
    let output = Command::new("sc")
        .args(["query", "state=all", "type=service"])
        .output()
        .unwrap();

    let mut list_services: Vec<ServiceProperties> = vec![];

    let converted_ut8_output = String::from_utf8_lossy(&output.stdout);
    let service_lines = converted_ut8_output
        .lines()
        .map(|line| line.split(" ").nth(1));

    let name_services = service_lines
        .enumerate()
        .filter(|(_index, part)| !part.is_none() && !part.unwrap().is_empty())
        .enumerate()
        .filter(|(level, _service)| level % 2 == 0)
        .map(|(_index, (_label, name))| name.unwrap());

    for (_enu, name_service) in name_services.enumerate() {
        let manager =
            ServiceManager::local_computer(None::<&str>, ServiceManagerAccess::CONNECT).unwrap();

        let status_service = manager.open_service(name_service, ServiceAccess::QUERY_STATUS);

        let query_status = match status_service {
            Ok(query) => query.query_status().unwrap(),
            Err(_) => continue,
        };

        if query_status.current_state == Running {
            let query_config = manager
                .open_service(name_service, ServiceAccess::QUERY_CONFIG)
                .unwrap()
                .query_config()
                .unwrap();

            let services_props = ServiceProperties {
                name: name_service.to_string(),
                id: query_status.process_id.unwrap(),
                display_name: query_config.display_name.to_str().unwrap().into(),
                service_type: query_status.service_type.bits(),
                exec_path: query_config.executable_path.to_str().unwrap().into(),
            };

            list_services.push(services_props);
        }
    }

    list_services
}
