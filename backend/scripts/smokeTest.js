(async function(){
  const API = 'http://localhost:5000/api';
  const email = 'iamsanz58@gmail.com'; // <-- Ganti dengan email asli Anda
  const password = 'Optimuzzz310772'; // <-- Ganti dengan password yang Anda inginkan
  const name = 'Admin Matzy Photobooth'; // <-- Ganti dengan nama Anda

  const log = (label, obj) => {
    console.log('--- ' + label + ' ---');
    try { console.log(JSON.stringify(obj, null, 2)); } catch(e){ console.log(obj); }
  };

  try{
    // Register
    const regRes = await fetch(`${API}/auth/register`, {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email,password,name})
    });
    const regJson = await regRes.json().catch(()=>null);
    log('register status', { status: regRes.status });
    log('register body', regJson);

    // Login
    const loginRes = await fetch(`${API}/auth/login`, {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email,password})
    });
    const loginJson = await loginRes.json();
    log('login status', { status: loginRes.status });
    log('login body', loginJson);

    const token = (loginJson?.data?.token) || (loginJson?.token) || (loginJson?.data?.token);
    const admin = (loginJson?.data?.admin) || loginJson?.admin || null;
    if(!token){
      console.error('No token returned; aborting create event.');
      process.exit(1);
    }

    // Create event
    const eventRes = await fetch(`${API}/events`, {
      method: 'POST', headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`},
      body: JSON.stringify({ title: 'SmokeTest Event', slug: 'smoketest-'+Date.now(), adminId: admin?.id || (loginJson?.data?.admin?.id) })
    });
    const eventJson = await eventRes.json().catch(()=>null);
    log('create event status', { status: eventRes.status });
    log('create event body', eventJson);

    process.exit(0);
  }catch(err){
    console.error('Smoke test error:', err);
    process.exit(2);
  }
})();
