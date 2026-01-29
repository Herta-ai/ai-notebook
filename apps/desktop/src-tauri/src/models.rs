use serde::{Deserialize, Serialize};
use surrealdb::RecordId;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct User {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub id: Option<RecordId>,
    pub username: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub password: Option<String>,
    pub nickname: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateUserDto {
    pub nickname: Option<String>,
    pub password: Option<String>,
}
