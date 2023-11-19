export async function POST(req) {
  const body = await req.json();
  console.log(body); // { name: "Mr Tester" , subject: 'General Inquiry', Message: 'ewfwegwf' }
  // Todo: Complete this, save the data either in Strapi, Spreadsheet or send it to and Email using AppScript

  return Response.json({ success: true });
}
