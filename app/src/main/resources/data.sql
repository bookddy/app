INSERT INTO users (username, email, password_hash, name, profile_image_url, bio, last_login, created_at, updated_at, is_deleted, role) VALUES
('john_doe', 'john.doe@example.com', 'hashed_password_1', 'John Doe', 'http://example.com/john.jpg', 'Bio of John Doe', NOW(), NOW(), NOW(), false, 'user'),
('jane_smith', 'jane.smith@example.com', 'hashed_password_2', 'Jane Smith', 'http://example.com/jane.jpg', 'Bio of Jane Smith', NOW(), NOW(), NOW(), false, 'admin'),
('alice_jones', 'alice.jones@example.com', 'hashed_password_3', 'Alice Jones', 'http://example.com/alice.jpg', 'Bio of Alice Jones', NOW(), NOW(), NOW(), false, 'user');