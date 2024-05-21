CREATE TABLE products (
    product_id UUID PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    product_link TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_value NUMERIC(12, 2) NOT NULL,
    product_type TEXT NOT NULL
);
