DO $$
BEGIN
    RAISE NOTICE 'Dropping existing tables...';

    DROP TABLE IF EXISTS
        review_likes,
        recommendations,
        user_communities,
        communities,
        bookshelf_books,
        bookshelves,
        reading_status,
        books_genres,
        genres,
        ratings,
        reviews,
        books,
        authors,
        users CASCADE;
END $$;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
   id UUID PRIMARY KEY,
   name TEXT,
   username TEXT NOT NULL UNIQUE,
   email TEXT NOT NULL UNIQUE,
   password TEXT NOT NULL,
   profile_image_url TEXT,
   bio TEXT,
   role TEXT NOT NULL DEFAULT 'user'
);

CREATE TABLE authors (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    biography TEXT,
    birth_date DATE,
    death_date DATE,
    profile_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE books (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    author_id BIGINT REFERENCES authors(id),
    publication_date DATE,
    isbn TEXT UNIQUE,
    description TEXT,
    cover_image_url TEXT,
    page_count INTEGER,
    language TEXT,
    publisher TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT false,
    CONSTRAINT valid_isbn CHECK (isbn ~ '^[0-9-]{10,17}$'),
    CONSTRAINT valid_page_count CHECK (page_count > 0)
);

CREATE TABLE reviews (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES users(id),
    book_id BIGINT REFERENCES books(id),
    review_text TEXT,
    is_spoiler BOOLEAN DEFAULT false,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT false,
    UNIQUE(user_id, book_id)
);

CREATE TABLE ratings (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id uuid REFERENCES users(id),
    book_id BIGINT REFERENCES books(id),
    rating INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_rating CHECK (rating >= 1 AND rating <= 5),
    UNIQUE(user_id, book_id)
);

CREATE TABLE genres (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE books_genres (
    book_id BIGINT REFERENCES books(id),
    genre_id BIGINT REFERENCES genres(id),
    PRIMARY KEY (book_id, genre_id)
);

CREATE TABLE reading_status (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES users(id),
    book_id BIGINT REFERENCES books(id),
    status TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_status CHECK (status IN ('want_to_read', 'reading', 'read')),
    UNIQUE(user_id, book_id)
);

CREATE TABLE bookshelves (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id uuid REFERENCES users(id),
    name TEXT NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE bookshelf_books (
    bookshelf_id BIGINT REFERENCES bookshelves(id),
    book_id BIGINT REFERENCES books(id),
    added_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (bookshelf_id, book_id)
);

CREATE TABLE communities (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_by uuid REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE user_communities (
    user_id uuid REFERENCES users(id),
    community_id BIGINT REFERENCES communities(id),
    role TEXT DEFAULT 'member',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, community_id),
    CONSTRAINT valid_community_role CHECK (role IN ('member', 'moderator', 'admin'))
);

CREATE TABLE review_likes (
    user_id uuid REFERENCES users(id),
    review_id BIGINT REFERENCES reviews(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, review_id)
);

CREATE TABLE recommendations (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id uuid REFERENCES users(id),
    book_id BIGINT REFERENCES books(id),
    recommended_to_user_id UUID REFERENCES users(id),
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_read BOOLEAN DEFAULT false
);

CREATE INDEX idx_books_author_id ON books(author_id);
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_reviews_book_id ON reviews(book_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_ratings_book_id ON ratings(book_id);
CREATE INDEX idx_ratings_user_id ON ratings(user_id);
CREATE INDEX idx_books_genres_book_id ON books_genres(book_id);
CREATE INDEX idx_books_genres_genre_id ON books_genres(genre_id);
CREATE INDEX idx_reading_status_user_id ON reading_status(user_id);
CREATE INDEX idx_reading_status_book_id ON reading_status(book_id);
CREATE INDEX idx_bookshelf_books_book_id ON bookshelf_books(book_id);
CREATE INDEX idx_user_communities_community_id ON user_communities(community_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
DECLARE
    t text;
BEGIN
    FOR t IN
        SELECT table_name
        FROM information_schema.columns
        WHERE column_name = 'updated_at'
        AND table_schema = 'public'
    LOOP
        EXECUTE format('
            CREATE TRIGGER update_%I_updated_at
            BEFORE UPDATE ON %I
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();',
            t, t);
    END LOOP;
END $$;

INSERT INTO genres (name, description) VALUES
    ('Fiction', 'Literary works created from the imagination'),
    ('Non-Fiction', 'Works based on facts and real events'),
    ('Science Fiction', 'Fiction based on imagined future scientific or technological advances'),
    ('Fantasy', 'Fiction featuring magical and supernatural elements'),
    ('Mystery', 'Fiction dealing with the solution of a crime or puzzle'),
    ('Romance', 'Fiction focusing on romantic love relationships'),
    ('Thriller', 'Fiction characterized by suspense and excitement'),
    ('Horror', 'Fiction intended to scare or frighten'),
    ('Biography', 'Non-fiction account of someone''s life'),
    ('History', 'Non-fiction about past events'),
    ('Science', 'Non-fiction about scientific subjects'),
    ('Technology', 'Non-fiction about technological subjects');