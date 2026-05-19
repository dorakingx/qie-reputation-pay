-- QIE Reputation Pay - Supabase schema + demo seed

create table if not exists profiles (
  address text primary key,
  display_name text not null,
  role text not null
);

create table if not exists payment_request_metadata (
  request_id bigint primary key,
  due_date timestamptz,
  category text not null,
  created_by text not null,
  chain_id int default 1983
);

-- Demo profiles
insert into profiles (address, display_name, role) values
  ('0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 'Maya Chen', 'Freelance Designer'),
  ('0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc', 'Dr. Alex Rivera', 'AI Researcher'),
  ('0x90f79bf6eb2c4f870365e785982e1f101e93b906', 'ShopWave Store', 'Small Online Merchant')
on conflict (address) do nothing;

-- Demo metadata (matches on-chain request IDs after deploy)
insert into payment_request_metadata (request_id, due_date, category, created_by, chain_id) values
  (1, '2026-06-01', 'Freelance Work', '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 31337),
  (2, '2026-06-15', 'Research Support', '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc', 31337)
on conflict (request_id) do nothing;
