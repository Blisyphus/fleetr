import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Missing access token." });
    return;
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    res
      .status(500)
      .json({ error: "Server is not configured for account deletion." });
    return;
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  const { data: userData, error: userError } =
    await supabaseAdmin.auth.getUser(token);

  if (userError || !userData?.user) {
    res.status(401).json({ error: "Invalid or expired session." });
    return;
  }

  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
    userData.user.id,
  );

  if (deleteError) {
    console.error("Delete account error:", deleteError);
    res
      .status(500)
      .json({ error: "Couldn't delete your account. Please try again." });
    return;
  }

  res.status(200).json({ success: true });
}
