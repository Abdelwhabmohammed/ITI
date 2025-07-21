-- 1. Create companies table
CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    industry VARCHAR(50),
    founded_date DATE,
    is_hiring BOOLEAN DEFAULT true
);

-- 2. Create jobs table
CREATE TABLE jobs (
    job_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    salary NUMERIC(10,2),
    posted_date DATE,
    company_id INT REFERENCES companies(company_id)
);

-- 3. Create applications table
CREATE TABLE applications (
    application_id SERIAL PRIMARY KEY,
    job_seeker_name VARCHAR(100) NOT NULL,
    application_date DATE,
    job_id INT REFERENCES jobs(job_id)
);

-- 4. Add location column to companies
ALTER TABLE companies
ADD COLUMN location VARCHAR(100);

-- 5. Rename salary to monthly_salary in jobs
ALTER TABLE jobs
RENAME COLUMN salary TO monthly_salary;

-- 6. Add UNIQUE constraint on title in jobs
ALTER TABLE jobs
ADD CONSTRAINT unique_job_title UNIQUE (title);

-- 7. Add applicant_email field and link it to a future users table
ALTER TABLE applications
ADD COLUMN applicant_email VARCHAR(100);