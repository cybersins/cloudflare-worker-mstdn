addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response("Error in Request", { status: 422 })
    )
  );
});

// alias actorID and Domain in actorID@DOMAIN.xx format
const aliasActorIdDomain = "<actorID@DOMAIN>";

// existing actorID and DOMAIN
//const existDomain = "<DOMAIN>";
//const existActorID = "<actorID>"
const existURL = "https://<MSTDN_DOMAIN>/.well-known/webfinger?resource=<actorID@DOMAIN>"

// Request URL
async function handleRequest(request) {
  const url = new URL(request.url);
  const { pathname, searchParams } = url;
  
  // Get parameter "resource" and it's value of <actorID@DOMAIN>
  let name = searchParams.get('resource');
  // Get parameter "resource" value if it contains acct:<actorID@DOMAIN> format
  let nameId = name.split(":")[1];

  // Validate the <username@server> and process the json accordingly from infosec.exchange server to response.
  try {
      if (pathname.startsWith("/.well-known/webfinger") && name.startsWith(aliasActorIdDomain) || nameId.startsWith(aliasActorIdDomain)) {
          const data = await fetch(existURL);
          const profile = await data.json();
          return new Response(JSON.stringify(profile, null, 2), {
              headers: { "Content-Type": "application/json"}
              });
              }
  }
  catch (e) {
      return event.respondWith(new Response("Error in Request", { status: 422 }));
  }
}
