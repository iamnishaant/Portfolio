import { NextResponse } from "next/server";
import { answer, retrieve } from "@/lib/retrieval";

export const runtime = "nodejs";

/**
 * Recruiter assistant endpoint.
 *
 * Today it answers from a local, grounded retrieval engine (no external
 * calls, no keys). To upgrade to a real LLM, `retrieve(query)` already
 * returns the grounded context passages — pass them plus the query to
 * your model of choice (e.g. Claude via the Anthropic SDK) and stream
 * the completion back in the same { answer, citations, suggestions }
 * shape the client expects.
 */
export async function POST(req: Request) {
  let query = "";
  try {
    const body = await req.json();
    query = typeof body?.query === "string" ? body.query.slice(0, 500) : "";
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const result = answer(query);

  // --- LLM upgrade hook -------------------------------------------------
  // const context = retrieve(query, 5);
  // const completion = await anthropic.messages.create({
  //   model: "claude-sonnet-5",
  //   system: "You are Nishant Shah's portfolio assistant. Answer ONLY from the provided context. Be concise and confident.",
  //   messages: [{ role: "user", content: `Context:\n${context.map(c => c.text).join("\n\n")}\n\nQuestion: ${query}` }],
  // });
  // ---------------------------------------------------------------------

  // touch retrieve so the import is always exercised (and ready for the hook)
  void retrieve;

  return NextResponse.json(result);
}
