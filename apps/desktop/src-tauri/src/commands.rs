use tauri::{State, AppHandle};
use crate::db::Db;
use crate::models::{User, UpdateUserDto};
use surrealdb::Error as SurrealError;

// Custom error type for Tauri
#[derive(Debug, serde::Serialize)]
pub struct CommandError {
    message: String,
}

impl From<SurrealError> for CommandError {
    fn from(err: SurrealError) -> Self {
        CommandError {
            message: err.to_string(),
        }
    }
}

#[tauri::command]
pub async fn get_current_user(db: State<'_, Db>) -> Result<User, CommandError> {
    // Hardcoded to fetch 'admin' user as per requirements
    let users: Vec<User> = db.query("SELECT * FROM user WHERE username = 'admin' LIMIT 1")
        .await
        .map_err(CommandError::from)?
        .take(0)
        .map_err(CommandError::from)?;

    users.first()
        .cloned()
        .ok_or(CommandError { message: "User not found".to_string() })
}

#[tauri::command]
pub async fn update_current_user(
    db: State<'_, Db>,
    payload: UpdateUserDto
) -> Result<User, CommandError> {
    // 1. Get the current admin user to find their ID
    let current_user: User = get_current_user(db.clone()).await?;
    
    // 2. Construct update query
    // We are updating the user found above.
    // In a real app we'd use the ID directly, but here we can just query by username again or use the ID if we had it.
    // Let's use the ID from the fetched user.
    
    if let Some(id) = current_user.id {
        let updated: Option<User> = db.update(id)
            .merge(payload)
            .await
            .map_err(CommandError::from)?;
            
        updated.ok_or(CommandError { message: "Failed to update user".to_string() })
    } else {
         Err(CommandError { message: "User has no ID".to_string() })
    }
}
