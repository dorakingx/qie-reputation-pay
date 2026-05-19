import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { PaymentCategory } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured =
  Boolean(supabaseUrl) && Boolean(supabaseAnonKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
}

export interface ProfileRow {
  address: string;
  display_name: string;
  role: string;
}

export interface MetadataRow {
  request_id: number;
  due_date: string | null;
  category: string;
  created_by: string;
  chain_id: number;
}

export async function fetchProfile(address: string): Promise<ProfileRow | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("address", address.toLowerCase())
    .maybeSingle();
  return data;
}

export async function insertPaymentMetadata(params: {
  requestId: number;
  dueDate: string;
  category: PaymentCategory;
  createdBy: string;
  chainId?: number;
}): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase.from("payment_request_metadata").insert({
    request_id: params.requestId,
    due_date: params.dueDate,
    category: params.category,
    created_by: params.createdBy.toLowerCase(),
    chain_id: params.chainId ?? 1983,
  });
}

export async function fetchMetadata(
  requestId: number
): Promise<MetadataRow | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from("payment_request_metadata")
    .select("*")
    .eq("request_id", requestId)
    .maybeSingle();
  return data;
}
