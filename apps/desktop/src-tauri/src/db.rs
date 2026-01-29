use surrealdb::engine::local::Mem;
use surrealdb::Surreal;
use crate::models::User;

pub type Db = Surreal<surrealdb::engine::local::Db>;

pub async fn init() -> surrealdb::Result<Db> {
    let db = Surreal::new::<Mem>(()).await?;
    
    // Select namespace and database
    db.use_ns("ai_notebook").use_db("desktop").await?;
    
    // Check if admin user exists, if not create it
    let admin_exists: Option<User> = db
        .query("SELECT * FROM user WHERE username = 'admin' LIMIT 1")
        .await?
        .take(0)?;

    if admin_exists.is_none() {
        let _created: Option<User> = db
            .create("user")
            .content(User {
                id: None, // Let DB generate ID, or we could specify it
                username: "admin".to_string(),
                password: Some("admin".to_string()), // Default password
                nickname: "Administrator".to_string(),
            })
            .await?;
        println!("Admin user created automatically.");
    }

    Ok(db)
}
