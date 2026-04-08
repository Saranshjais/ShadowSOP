CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: Companies (for multi-tenancy)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: SOPs
CREATE TABLE sops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    raw_source_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: Steps
CREATE TABLE steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sop_id UUID REFERENCES sops(id) ON DELETE CASCADE,
    step_order INT NOT NULL,
    action TEXT NOT NULL,
    context_notes TEXT
);

-- Table: Edge_Cases
CREATE TABLE edge_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sop_id UUID REFERENCES sops(id) ON DELETE CASCADE,
    condition TEXT NOT NULL,
    resolution TEXT NOT NULL
);
