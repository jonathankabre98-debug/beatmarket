// ─── SUPABASE ────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://zwftcovxxirzzqdmkymc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_NTyCZ4iyHpO7kzvZRVGa6A_YEjsXPhU";

async function sbRequest(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Supabase error: ${t}`); }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
const sbSelect = (table, query = "") => sbRequest(`${table}?select=*${query}`);
const trackFromDb = r => ({
  id: r.id, title: r.title, genre: r.genre, cover: r.cover,
  audioUrl: r.audio_url, audioName: r.audio_name,
  duration: r.duration || 180, producer: r.producer || "@INCONNU",
  plays: r.plays || 0, downloads: r.downloads || 0,
  likes: r.favorites || 0, shares: r.shares || 0,
  exclusive: r.exclusive || false, price: 49,
});



const SUPABASE_URL = "https://zwftcovxxirzzqdmkymc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_NTyCZ4iyHpO7kzvZRVGa6A_YEjsXPhU";

async function sbRequest(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Supabase error (${res.status}): ${errText}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const sbSelect = (table, query = "") => sbRequest(`${table}?select=*${query}`);
const sbInsert = (table, row) => sbRequest(table, { method: "POST", body: JSON.stringify(row) });
const sbUpdate = (table, id, patch) => sbRequest(`${table}?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(patch) });

// Convertit une ligne Supabase (snake_case) en objet beat utilisé par l'app (camelCase)
const trackFromDb = r => ({
  id: r.id,
  title: r.title,
  genre: r.genre,
  cover: r.cover,
  audioUrl: r.audio_url,
  audioName: r.audio_name,
  duration: r.duration || 180,
  producer: r.producer || "@INCONNU",
  plays: r.plays || 0,
  downloads: r.downloads || 0,
  likes: r.favorites || 0,
  shares: r.shares || 0,
  exclusive: r.exclusive || false,
  price: 49,
});


const LANGS = {
  fr:{name:"Français",flag:"🇫🇷",dir:"ltr",t:{
    appName:"BeatMarket",tagline:"Écoute. Découvre. Crée.",forYou:"Pour toi",following:"Suivis",
    search:"Rechercher",searchPlaceholder:"Titre, artiste, genre…",noResults:"Aucun résultat",
    feed:"FEED",favs:"FAVORIS",playlists:"PLAYLISTS",    activity:"ACTIVITÉ",downloadsTab:"TÉLÉCHARGEMENTS",profile:"PROFIL",
    settings:"Paramètres",notifications:"Notifications",help:"Aide",
    playing:"EN COURS",next:"Suivant",pause:"Pause",play:"Lire",
    likes:"Likes",comments:"Commentaires",saves:"Sauvegardes",shares:"Partages",download:"Télécharger",
    premium:"Premium",free:"Gratuit",activatePremium:"Activer Premium · 1 mois",
    noAds:"Sans publicité",fastDownload:"Téléchargements rapides",maxQuality:"Qualité maximale",
    exclusiveAccess:"Accès exclusifs",commercialLicense:"Licence commerciale",
    watchAd:"Regarder une pub et télécharger",waitSec:"Patienter",adLabel:"PUBLICITÉ",
    myFavs:"Mes Favoris",noFavsYet:"Swipe et appuie sur ⭐ pour sauvegarder.",
    myPlaylists:"Mes Playlists",createPlaylist:"+ Créer",newPlaylist:"Nouvelle playlist",
    playlistName:"Nom de la playlist…",public:"Publique",private:"Privée",collaborative:"Collaborative",
    recentlyPlayed:"Récemment écoutés",recentDownloads:"Téléchargements récents",
    recentFavs:"Favoris récents",lastSearches:"Dernières recherches",noActivity:"Aucune activité pour l'instant.",
    totalPlays:"Écoutes totales",totalTime:"Temps d'écoute",downloads:"Téléchargements",
    tokensEarned:"Jetons gagnés",tokensSpent:"Jetons dépensés",memberSince:"Membre depuis",
    editProfile:"Modifier profil",save:"Enregistrer",cancel:"Annuler",
    pseudo:"Pseudo",email:"Email",password:"Mot de passe",bio:"Bio",
    profilePhoto:"Photo de profil",connectedDevices:"Appareils connectés",
    loginHistory:"Historique des connexions",deleteAccount:"Supprimer mon compte",logout:"Déconnexion",
    language:"Langue",theme:"Thème",accessibility:"Accessibilité",
    darkMode:"Mode sombre",textSize:"Taille du texte",reduceAnimations:"Réduire les animations",
    faq:"FAQ",contactSupport:"Contact support",reportProblem:"Signaler un problème",
    termsOfUse:"Conditions d'utilisation",privacyPolicy:"Politique de confidentialité",
    newLike:"a aimé votre beat",newComment:"a commenté",newFollower:"vous suit maintenant",
    tokenReward:"Vous avez gagné des jetons !",premiumPromo:"Offre Premium disponible",newMusic:"Nouveau son disponible",
    markAllRead:"Tout marquer comme lu",noNotifs:"Aucune notification.",
    offlineAvailable:"Disponible hors ligne",offlineNote:"Sons téléchargés accessibles sans Internet.",
    feature:"Fonctionnalité",premiumBadge:"Badge Premium",
    deleteConfirm:"Supprimer définitivement ?",deleteWarning:"Cette action est irréversible.",
    confirmDelete:"Oui, supprimer",
    signupTitle:"Rejoins BeatMarket",signupSubtitle:"Crée ton compte pour profiter de toutes les fonctionnalités",
    signupRequiredDownload:"Crée ton compte gratuit pour télécharger cet instru.",
    signupRequiredLike:"Crée ton compte gratuit pour liker ce beat.",
    signupRequiredFav:"Crée ton compte gratuit pour l'ajouter à tes favoris.",
    signupRequiredComment:"Crée ton compte gratuit pour commenter.",
    signupRequiredPlaylist:"Crée ton compte gratuit pour créer une playlist.",
    continueWithGoogle:"Continuer avec Google",continueWithEmail:"Continuer avec un e-mail",
    or:"ou",fullName:"Nom complet",emailAddress:"Adresse e-mail",createPassword:"Créer un mot de passe",
    selectCountry:"Sélectionne ton pays",searchCountry:"Rechercher un pays…",
    createAccount:"Créer mon compte",alreadyHaveAccount:"Tu as déjà un compte ?",logIn:"Se connecter",
    backToSignup:"Créer un compte",bySigningUp:"En continuant, tu acceptes nos",
    andOur:"et notre",step:"Étape",of:"sur",continueBtn:"Continuer",back:"Retour",
    accountCreated:"Compte créé avec succès !",welcomeBack:"Content de te revoir",
    googleConnecting:"Connexion à Google…",
    profileLockedTitle:"Accède à ton profil",profileLockedSub:"Crée ton compte pour voir tes stats, tes gains et gérer tes informations.",
    signupRequiredProfile:"Crée ton compte gratuit pour accéder à ton profil.",
    signUpNow:"S'inscrire maintenant",
    addFirstComment:"Sois le premier à commenter !",addComment:"Ajouter un commentaire…",
    plays:"écoutes",exclusive:"💎 Exclusif Premium",
    byGenre:"Explorer par genre",recentlyListened:"Récemment écoutés",
    continueAsFree:"Continuer en gratuit",premiumTitle:"BeatMarket Premium",premiumSubtitle:"L'expérience musicale sans limites",
    premiumActive:"Premium actif",activeUntil:"Actif jusqu'au",
    splashLoading:"Chargement…",onboardingTitle:"Quels genres t'attirent ?",onboardingSub:"On personnalise ton feed dès maintenant.",
    enter:"🚀 Entrer dans l'univers",skip:"Passer",
    downloadNow:"⬇️ Télécharger maintenant",downloaded:"téléchargé !",
    linkCopied:"Lien copié !",savedToFavs:"Sauvegardé !",removedFromFavs:"Retiré des favoris",
    premiumActivated:"👑 Premium activé !",premiumDownload:"⬇️ Téléchargement Premium lancé !",
    featureUnavailableOffline:"Fonctionnalité indisponible hors ligne",
    faqItems:[
      {q:"Comment télécharger un beat ?",a:"Appuie sur ⬇️, regarde une courte pub (version gratuite) ou télécharge instantanément avec Premium."},
      {q:"Qu'est-ce que la licence commerciale ?",a:"Elle te permet d'utiliser le beat pour monétiser tes vidéos YouTube, TikTok, etc. Disponible uniquement Premium."},
      {q:"Comment gagner des jetons ?",a:"Écoute des sons, laisse des commentaires, partage des beats. Chaque action te rapporte des jetons."},
      {q:"Comment annuler Premium ?",a:"Rends-toi dans Paramètres > Premium > Annuler l'abonnement."},
    ],
  }},
  en:{name:"English",flag:"🇬🇧",dir:"ltr",t:{
    appName:"BeatMarket",tagline:"Listen. Discover. Create.",forYou:"For You",following:"Following",
    search:"Search",searchPlaceholder:"Title, artist, genre…",noResults:"No results",
    feed:"FEED",favs:"FAVORITES",playlists:"PLAYLISTS",    activity:"ACTIVITY",downloadsTab:"DOWNLOADS",profile:"PROFILE",
    settings:"Settings",notifications:"Notifications",help:"Help",
    playing:"PLAYING",next:"Next",pause:"Pause",play:"Play",
    likes:"Likes",comments:"Comments",saves:"Saves",shares:"Shares",download:"Download",
    premium:"Premium",free:"Free",activatePremium:"Activate Premium · 1 month",
    noAds:"No ads",fastDownload:"Fast downloads",maxQuality:"Max quality",
    exclusiveAccess:"Exclusive access",commercialLicense:"Commercial license",
    watchAd:"Watch an ad and download",waitSec:"Wait",adLabel:"AD",
    myFavs:"My Favorites",noFavsYet:"Swipe and tap ⭐ to save.",
    myPlaylists:"My Playlists",createPlaylist:"+ Create",newPlaylist:"New playlist",
    playlistName:"Playlist name…",public:"Public",private:"Private",collaborative:"Collaborative",
    recentlyPlayed:"Recently Played",recentDownloads:"Recent Downloads",
    recentFavs:"Recent Favorites",lastSearches:"Last Searches",noActivity:"No activity yet.",
    totalPlays:"Total Plays",totalTime:"Listening Time",downloads:"Downloads",
    tokensEarned:"Tokens Earned",tokensSpent:"Tokens Spent",memberSince:"Member Since",
    editProfile:"Edit Profile",save:"Save",cancel:"Cancel",
    pseudo:"Username",email:"Email",password:"Password",bio:"Bio",
    profilePhoto:"Profile Photo",connectedDevices:"Connected Devices",
    loginHistory:"Login History",deleteAccount:"Delete My Account",logout:"Logout",
    language:"Language",theme:"Theme",accessibility:"Accessibility",
    darkMode:"Dark Mode",textSize:"Text Size",reduceAnimations:"Reduce Animations",
    faq:"FAQ",contactSupport:"Contact Support",reportProblem:"Report a Problem",
    termsOfUse:"Terms of Use",privacyPolicy:"Privacy Policy",
    newLike:"liked your beat",newComment:"commented",newFollower:"is now following you",
    tokenReward:"You earned tokens!",premiumPromo:"Premium offer available",newMusic:"New sound available",
    markAllRead:"Mark all as read",noNotifs:"No notifications.",
    offlineAvailable:"Available offline",offlineNote:"Downloaded sounds accessible without Internet.",
    feature:"Feature",premiumBadge:"Premium Badge",
    deleteConfirm:"Delete permanently?",deleteWarning:"This action is irreversible.",confirmDelete:"Yes, delete",
    signupTitle:"Join BeatMarket",signupSubtitle:"Create your account to unlock all features",
    signupRequiredDownload:"Create your free account to download this beat.",
    signupRequiredLike:"Create your free account to like this beat.",
    signupRequiredFav:"Create your free account to save it to favorites.",
    signupRequiredComment:"Create your free account to comment.",
    signupRequiredPlaylist:"Create your free account to create a playlist.",
    continueWithGoogle:"Continue with Google",continueWithEmail:"Continue with email",
    or:"or",fullName:"Full name",emailAddress:"Email address",createPassword:"Create a password",
    selectCountry:"Select your country",searchCountry:"Search a country…",
    createAccount:"Create my account",alreadyHaveAccount:"Already have an account?",logIn:"Log in",
    backToSignup:"Create an account",bySigningUp:"By continuing, you agree to our",
    andOur:"and our",step:"Step",of:"of",continueBtn:"Continue",back:"Back",
    accountCreated:"Account created successfully!",welcomeBack:"Welcome back",
    googleConnecting:"Connecting to Google…",
    profileLockedTitle:"Access your profile",profileLockedSub:"Create your account to see your stats, earnings, and manage your info.",
    signupRequiredProfile:"Create your free account to access your profile.",
    signUpNow:"Sign up now",
    addFirstComment:"Be the first to comment!",addComment:"Add a comment…",
    plays:"plays",exclusive:"💎 Premium Exclusive",
    byGenre:"Explore by genre",recentlyListened:"Recently listened",
    continueAsFree:"Continue for free",premiumTitle:"BeatMarket Premium",premiumSubtitle:"The unlimited music experience",
    premiumActive:"Premium active",activeUntil:"Active until",
    splashLoading:"Loading…",onboardingTitle:"What genres do you like?",onboardingSub:"We'll personalize your feed right now.",
    enter:"🚀 Enter the universe",skip:"Skip",
    downloadNow:"⬇️ Download now",downloaded:"downloaded!",
    linkCopied:"Link copied!",savedToFavs:"Saved!",removedFromFavs:"Removed from favorites",
    premiumActivated:"👑 Premium activated!",premiumDownload:"⬇️ Premium download started!",
    featureUnavailableOffline:"Feature unavailable offline",
    faqItems:[
      {q:"How to download a beat?",a:"Tap ⬇️, watch a short ad (free version) or download instantly with Premium."},
      {q:"What is a commercial license?",a:"It lets you monetize your YouTube, TikTok videos, etc. Available with Premium only."},
      {q:"How to earn tokens?",a:"Listen to tracks, comment, share beats. Every action earns you tokens."},
      {q:"How to cancel Premium?",a:"Go to Settings > Premium > Cancel subscription."},
    ],
  }},
  es:{name:"Español",flag:"🇪🇸",dir:"ltr",t:{
    appName:"BeatMarket",tagline:"Escucha. Descubre. Crea.",forYou:"Para ti",following:"Siguiendo",
    search:"Buscar",searchPlaceholder:"Título, artista, género…",noResults:"Sin resultados",
    feed:"FEED",favs:"FAVORITOS",playlists:"LISTAS",activity:"ACTIVIDAD",profile:"PERFIL",
    settings:"Ajustes",notifications:"Notificaciones",help:"Ayuda",
    playing:"REPRODUCIENDO",next:"Siguiente",pause:"Pausar",play:"Reproducir",
    likes:"Me gusta",comments:"Comentarios",saves:"Guardados",shares:"Compartir",download:"Descargar",
    premium:"Premium",free:"Gratis",activatePremium:"Activar Premium · 1 mes",
    noAds:"Sin anuncios",fastDownload:"Descargas rápidas",maxQuality:"Calidad máxima",
    exclusiveAccess:"Acceso exclusivo",commercialLicense:"Licencia comercial",
    watchAd:"Ver un anuncio y descargar",waitSec:"Esperar",adLabel:"ANUNCIO",
    myFavs:"Mis Favoritos",noFavsYet:"Desliza y toca ⭐ para guardar.",
    myPlaylists:"Mis Listas",createPlaylist:"+ Crear",newPlaylist:"Nueva lista",
    playlistName:"Nombre de la lista…",public:"Pública",private:"Privada",collaborative:"Colaborativa",
    recentlyPlayed:"Reproducidos recientemente",recentDownloads:"Descargas recientes",
    recentFavs:"Favoritos recientes",lastSearches:"Últimas búsquedas",noActivity:"Sin actividad todavía.",
    totalPlays:"Total de escuchas",totalTime:"Tiempo de escucha",downloads:"Descargas",
    tokensEarned:"Fichas ganadas",tokensSpent:"Fichas gastadas",memberSince:"Miembro desde",
    editProfile:"Editar perfil",save:"Guardar",cancel:"Cancelar",
    pseudo:"Usuario",email:"Email",password:"Contraseña",bio:"Bio",
    profilePhoto:"Foto de perfil",connectedDevices:"Dispositivos conectados",
    loginHistory:"Historial de conexiones",deleteAccount:"Eliminar mi cuenta",logout:"Cerrar sesión",
    language:"Idioma",theme:"Tema",accessibility:"Accesibilidad",
    darkMode:"Modo oscuro",textSize:"Tamaño del texto",reduceAnimations:"Reducir animaciones",
    faq:"Preguntas frecuentes",contactSupport:"Contactar soporte",reportProblem:"Reportar un problema",
    termsOfUse:"Términos de uso",privacyPolicy:"Política de privacidad",
    newLike:"le gustó tu beat",newComment:"comentó",newFollower:"te sigue ahora",
    tokenReward:"¡Ganaste fichas!",premiumPromo:"Oferta Premium disponible",newMusic:"Nuevo sonido disponible",
    markAllRead:"Marcar todo como leído",noNotifs:"Sin notificaciones.",
    offlineAvailable:"Disponible sin conexión",offlineNote:"Sonidos descargados accesibles sin Internet.",
    feature:"Función",premiumBadge:"Insignia Premium",
    deleteConfirm:"¿Eliminar definitivamente?",deleteWarning:"Esta acción es irreversible.",confirmDelete:"Sí, eliminar",
    addFirstComment:"¡Sé el primero en comentar!",addComment:"Agregar un comentario…",
    plays:"escuchas",exclusive:"💎 Exclusivo Premium",
    byGenre:"Explorar por género",recentlyListened:"Escuchados recientemente",
    continueAsFree:"Continuar gratis",premiumTitle:"BeatMarket Premium",premiumSubtitle:"La experiencia musical sin límites",
    premiumActive:"Premium activo",activeUntil:"Activo hasta",
    splashLoading:"Cargando…",onboardingTitle:"¿Qué géneros te gustan?",onboardingSub:"Personalizamos tu feed ahora mismo.",
    enter:"🚀 Entrar al universo",skip:"Omitir",
    downloadNow:"⬇️ Descargar ahora",downloaded:"descargado!",
    linkCopied:"¡Enlace copiado!",savedToFavs:"¡Guardado!",removedFromFavs:"Eliminado de favoritos",
    premiumActivated:"👑 ¡Premium activado!",premiumDownload:"⬇️ ¡Descarga Premium iniciada!",
    featureUnavailableOffline:"Función no disponible sin conexión",
    faqItems:[{q:"¿Cómo descargar?",a:"Toca ⬇️, mira un anuncio (gratis) o descarga al instante con Premium."},{q:"¿Licencia comercial?",a:"Permite monetizar tus videos. Solo disponible con Premium."},{q:"¿Cómo ganar fichas?",a:"Escucha, comenta, comparte. Cada acción te da fichas."},{q:"¿Cancelar Premium?",a:"Ve a Ajustes > Premium > Cancelar suscripción."}],
  }},
  pt:{name:"Português",flag:"🇧🇷",dir:"ltr",t:{appName:"BeatMarket",tagline:"Ouça. Descubra. Crie.",forYou:"Para você",following:"Seguindo",search:"Pesquisar",searchPlaceholder:"Título, artista, gênero…",noResults:"Sem resultados",feed:"FEED",favs:"FAVORITOS",playlists:"PLAYLISTS",activity:"ATIVIDADE",profile:"PERFIL",settings:"Configurações",notifications:"Notificações",help:"Ajuda",playing:"TOCANDO",next:"Próximo",pause:"Pausar",play:"Tocar",likes:"Curtidas",comments:"Comentários",saves:"Salvos",shares:"Compartilhar",download:"Baixar",premium:"Premium",free:"Grátis",activatePremium:"Ativar Premium · 1 mês",noAds:"Sem anúncios",fastDownload:"Downloads rápidos",maxQuality:"Qualidade máxima",exclusiveAccess:"Acesso exclusivo",commercialLicense:"Licença comercial",watchAd:"Ver anúncio e baixar",waitSec:"Aguardar",adLabel:"ANÚNCIO",myFavs:"Meus Favoritos",noFavsYet:"Deslize e toque ⭐ para salvar.",myPlaylists:"Minhas Playlists",createPlaylist:"+ Criar",newPlaylist:"Nova playlist",playlistName:"Nome da playlist…",public:"Pública",private:"Privada",collaborative:"Colaborativa",recentlyPlayed:"Tocados recentemente",recentDownloads:"Downloads recentes",recentFavs:"Favoritos recentes",lastSearches:"Últimas pesquisas",noActivity:"Nenhuma atividade ainda.",totalPlays:"Total de plays",totalTime:"Tempo de escuta",downloads:"Downloads",tokensEarned:"Tokens ganhos",tokensSpent:"Tokens gastos",memberSince:"Membro desde",editProfile:"Editar perfil",save:"Salvar",cancel:"Cancelar",pseudo:"Usuário",email:"Email",password:"Senha",bio:"Bio",profilePhoto:"Foto de perfil",connectedDevices:"Dispositivos conectados",loginHistory:"Histórico de logins",deleteAccount:"Excluir minha conta",logout:"Sair",language:"Idioma",theme:"Tema",accessibility:"Acessibilidade",darkMode:"Modo escuro",textSize:"Tamanho do texto",reduceAnimations:"Reduzir animações",faq:"FAQ",contactSupport:"Suporte",reportProblem:"Reportar problema",termsOfUse:"Termos de uso",privacyPolicy:"Política de privacidade",newLike:"curtiu seu beat",newComment:"comentou",newFollower:"está te seguindo",tokenReward:"Você ganhou tokens!",premiumPromo:"Oferta Premium disponível",newMusic:"Novo som disponível",markAllRead:"Marcar tudo como lido",noNotifs:"Sem notificações.",offlineAvailable:"Disponível offline",offlineNote:"Sons baixados acessíveis sem Internet.",feature:"Função",premiumBadge:"Badge Premium",deleteConfirm:"Excluir definitivamente?",deleteWarning:"Esta ação é irreversível.",confirmDelete:"Sim, excluir",addFirstComment:"Seja o primeiro a comentar!",addComment:"Adicionar comentário…",plays:"plays",exclusive:"💎 Exclusivo Premium",byGenre:"Explorar por gênero",recentlyListened:"Ouvidos recentemente",continueAsFree:"Continuar grátis",premiumTitle:"BeatMarket Premium",premiumSubtitle:"A experiência musical sem limites",premiumActive:"Premium ativo",activeUntil:"Ativo até",splashLoading:"Carregando…",onboardingTitle:"Quais gêneros você curte?",onboardingSub:"Vamos personalizar seu feed agora.",enter:"🚀 Entrar no universo",skip:"Pular",downloadNow:"⬇️ Baixar agora",downloaded:"baixado!",linkCopied:"Link copiado!",savedToFavs:"Salvo!",removedFromFavs:"Removido dos favoritos",premiumActivated:"👑 Premium ativado!",premiumDownload:"⬇️ Download Premium iniciado!",featureUnavailableOffline:"Função indisponível offline",faqItems:[{q:"Como baixar?",a:"Toque ⬇️, assista um anúncio (grátis) ou baixe instantaneamente com Premium."},{q:"Licença comercial?",a:"Permite monetizar seus vídeos. Disponível só com Premium."},{q:"Como ganhar tokens?",a:"Ouça, comente, compartilhe. Cada ação gera tokens."},{q:"Cancelar Premium?",a:"Vá em Configurações > Premium > Cancelar assinatura."}]}},
  ar:{name:"العربية",flag:"🇸🇦",dir:"rtl",t:{appName:"BeatMarket",tagline:"استمع. اكتشف. اصنع.",forYou:"لك",following:"متابَعون",search:"بحث",searchPlaceholder:"عنوان، فنان، نوع…",noResults:"لا نتائج",feed:"الموجز",favs:"المفضلة",playlists:"قوائم",activity:"النشاط",profile:"الملف",settings:"الإعدادات",notifications:"الإشعارات",help:"المساعدة",playing:"يشغّل",next:"التالي",pause:"إيقاف",play:"تشغيل",likes:"إعجابات",comments:"تعليقات",saves:"حفظ",shares:"مشاركة",download:"تنزيل",premium:"بريميوم",free:"مجاني",activatePremium:"تفعيل بريميوم · شهر",noAds:"بدون إعلانات",fastDownload:"تنزيل سريع",maxQuality:"أعلى جودة",exclusiveAccess:"وصول حصري",commercialLicense:"رخصة تجارية",watchAd:"شاهد إعلانًا وحمّل",waitSec:"انتظر",adLabel:"إعلان",myFavs:"مفضلتي",noFavsYet:"اسحب واضغط ⭐ للحفظ.",myPlaylists:"قوائمي",createPlaylist:"+ إنشاء",newPlaylist:"قائمة جديدة",playlistName:"اسم القائمة…",public:"عامة",private:"خاصة",collaborative:"تعاونية",recentlyPlayed:"المشغّلة مؤخرًا",recentDownloads:"التنزيلات الأخيرة",recentFavs:"المفضلة الأخيرة",lastSearches:"آخر عمليات البحث",noActivity:"لا نشاط بعد.",totalPlays:"إجمالي التشغيل",totalTime:"وقت الاستماع",downloads:"التنزيلات",tokensEarned:"رموز مكتسبة",tokensSpent:"رموز منفقة",memberSince:"عضو منذ",editProfile:"تعديل الملف",save:"حفظ",cancel:"إلغاء",pseudo:"اسم المستخدم",email:"البريد",password:"كلمة المرور",bio:"نبذة",profilePhoto:"صورة الملف",connectedDevices:"الأجهزة المتصلة",loginHistory:"سجل الدخول",deleteAccount:"حذف حسابي",logout:"تسجيل الخروج",language:"اللغة",theme:"المظهر",accessibility:"إمكانية الوصول",darkMode:"الوضع الداكن",textSize:"حجم الخط",reduceAnimations:"تقليل الحركات",faq:"الأسئلة الشائعة",contactSupport:"دعم فني",reportProblem:"الإبلاغ عن مشكلة",termsOfUse:"شروط الاستخدام",privacyPolicy:"سياسة الخصوصية",newLike:"أعجبه بيتك",newComment:"علّق",newFollower:"يتابعك الآن",tokenReward:"ربحت رموزًا!",premiumPromo:"عرض بريميوم متاح",newMusic:"صوت جديد متاح",markAllRead:"تحديد الكل كمقروء",noNotifs:"لا إشعارات.",offlineAvailable:"متاح بدون إنترنت",offlineNote:"الأصوات المحمّلة متاحة دون إنترنت.",feature:"الميزة",premiumBadge:"شارة بريميوم",deleteConfirm:"حذف نهائي؟",deleteWarning:"هذا الإجراء لا رجعة فيه.",confirmDelete:"نعم، احذف",addFirstComment:"كن أول من يعلّق!",addComment:"أضف تعليقًا…",plays:"تشغيل",exclusive:"💎 حصري بريميوم",byGenre:"استكشاف حسب النوع",recentlyListened:"المستمع إليها مؤخرًا",continueAsFree:"المتابعة مجانًا",premiumTitle:"BeatMarket بريميوم",premiumSubtitle:"تجربة موسيقية بلا حدود",premiumActive:"بريميوم نشط",activeUntil:"نشط حتى",splashLoading:"جارٍ التحميل…",onboardingTitle:"ما الأنواع التي تفضّلها؟",onboardingSub:"سنخصّص موجزك الآن.",enter:"🚀 ادخل العالم",skip:"تخطّ",downloadNow:"⬇️ تنزيل الآن",downloaded:"تم التنزيل!",linkCopied:"تم نسخ الرابط!",savedToFavs:"تم الحفظ!",removedFromFavs:"تمت الإزالة",premiumActivated:"👑 تم تفعيل بريميوم!",premiumDownload:"⬇️ بدأ تنزيل بريميوم!",featureUnavailableOffline:"الميزة غير متاحة بدون إنترنت",faqItems:[{q:"كيف أحمّل بيتًا؟",a:"اضغط ⬇️، شاهد إعلانًا قصيرًا (مجاني) أو حمّل فورًا مع بريميوم."},{q:"ما الرخصة التجارية؟",a:"تتيح لك تحقيق الدخل من فيديوهاتك. متاحة مع بريميوم فقط."},{q:"كيف أكسب رموزًا؟",a:"استمع، علّق، شارك. كل إجراء يمنحك رموزًا."},{q:"كيف ألغي بريميوم؟",a:"اذهب إلى الإعدادات > بريميوم > إلغاء الاشتراك."}]}},
  de:{name:"Deutsch",flag:"🇩🇪",dir:"ltr",t:{appName:"BeatMarket",tagline:"Hör. Entdecke. Erschaffe.",forYou:"Für dich",following:"Folge ich",search:"Suchen",searchPlaceholder:"Titel, Künstler, Genre…",noResults:"Keine Ergebnisse",feed:"FEED",favs:"FAVORITEN",playlists:"PLAYLISTS",activity:"AKTIVITÄT",profile:"PROFIL",settings:"Einstellungen",notifications:"Benachrichtigungen",help:"Hilfe",playing:"SPIELT",next:"Nächste",pause:"Pausieren",play:"Abspielen",likes:"Likes",comments:"Kommentare",saves:"Gespeichert",shares:"Teilen",download:"Herunterladen",premium:"Premium",free:"Kostenlos",activatePremium:"Premium aktivieren · 1 Monat",noAds:"Keine Werbung",fastDownload:"Schnelle Downloads",maxQuality:"Maximale Qualität",exclusiveAccess:"Exklusiver Zugang",commercialLicense:"Kommerzielle Lizenz",watchAd:"Werbung ansehen & herunterladen",waitSec:"Warten",adLabel:"WERBUNG",myFavs:"Meine Favoriten",noFavsYet:"Wische und tippe ⭐ zum Speichern.",myPlaylists:"Meine Playlists",createPlaylist:"+ Erstellen",newPlaylist:"Neue Playlist",playlistName:"Playlist-Name…",public:"Öffentlich",private:"Privat",collaborative:"Kollaborativ",recentlyPlayed:"Kürzlich gespielt",recentDownloads:"Kürzliche Downloads",recentFavs:"Kürzliche Favoriten",lastSearches:"Letzte Suchen",noActivity:"Noch keine Aktivität.",totalPlays:"Gesamte Wiedergaben",totalTime:"Hörzeit",downloads:"Downloads",tokensEarned:"Verdiente Token",tokensSpent:"Ausgegebene Token",memberSince:"Mitglied seit",editProfile:"Profil bearbeiten",save:"Speichern",cancel:"Abbrechen",pseudo:"Benutzername",email:"E-Mail",password:"Passwort",bio:"Bio",profilePhoto:"Profilfoto",connectedDevices:"Verbundene Geräte",loginHistory:"Anmeldeverlauf",deleteAccount:"Konto löschen",logout:"Abmelden",language:"Sprache",theme:"Thema",accessibility:"Barrierefreiheit",darkMode:"Dunkler Modus",textSize:"Textgröße",reduceAnimations:"Animationen reduzieren",faq:"FAQ",contactSupport:"Support kontaktieren",reportProblem:"Problem melden",termsOfUse:"Nutzungsbedingungen",privacyPolicy:"Datenschutz",newLike:"hat deinen Beat geliked",newComment:"hat kommentiert",newFollower:"folgt dir jetzt",tokenReward:"Du hast Token verdient!",premiumPromo:"Premium-Angebot verfügbar",newMusic:"Neuer Sound verfügbar",markAllRead:"Alle als gelesen markieren",noNotifs:"Keine Benachrichtigungen.",offlineAvailable:"Offline verfügbar",offlineNote:"Heruntergeladene Sounds ohne Internet verfügbar.",feature:"Funktion",premiumBadge:"Premium-Abzeichen",deleteConfirm:"Endgültig löschen?",deleteWarning:"Diese Aktion ist unwiderruflich.",confirmDelete:"Ja, löschen",addFirstComment:"Sei der Erste, der kommentiert!",addComment:"Kommentar hinzufügen…",plays:"Plays",exclusive:"💎 Premium Exklusiv",byGenre:"Nach Genre erkunden",recentlyListened:"Kürzlich gehört",continueAsFree:"Kostenlos fortfahren",premiumTitle:"BeatMarket Premium",premiumSubtitle:"Das unbegrenzte Musikerlebnis",premiumActive:"Premium aktiv",activeUntil:"Aktiv bis",splashLoading:"Wird geladen…",onboardingTitle:"Welche Genres magst du?",onboardingSub:"Wir personalisieren deinen Feed jetzt.",enter:"🚀 Universe betreten",skip:"Überspringen",downloadNow:"⬇️ Jetzt herunterladen",downloaded:"heruntergeladen!",linkCopied:"Link kopiert!",savedToFavs:"Gespeichert!",removedFromFavs:"Aus Favoriten entfernt",premiumActivated:"👑 Premium aktiviert!",premiumDownload:"⬇️ Premium-Download gestartet!",featureUnavailableOffline:"Funktion offline nicht verfügbar",faqItems:[{q:"Wie lade ich einen Beat herunter?",a:"Tippe auf ⬇️, schau eine kurze Werbung (kostenlos) oder lade sofort mit Premium herunter."},{q:"Was ist eine kommerzielle Lizenz?",a:"Damit kannst du deine YouTube/TikTok-Videos monetarisieren. Nur mit Premium."},{q:"Wie verdiene ich Token?",a:"Hören, kommentieren, teilen. Jede Aktion bringt Token."},{q:"Wie kündige ich Premium?",a:"Einstellungen > Premium > Abonnement kündigen."}]}},
  it:{name:"Italiano",flag:"🇮🇹",dir:"ltr",t:{appName:"BeatMarket",tagline:"Ascolta. Scopri. Crea.",forYou:"Per te",following:"Seguiti",search:"Cerca",searchPlaceholder:"Titolo, artista, genere…",noResults:"Nessun risultato",feed:"FEED",favs:"PREFERITI",playlists:"PLAYLIST",activity:"ATTIVITÀ",profile:"PROFILO",settings:"Impostazioni",notifications:"Notifiche",help:"Aiuto",playing:"IN RIPRODUZIONE",next:"Successivo",pause:"Pausa",play:"Riproduci",likes:"Mi piace",comments:"Commenti",saves:"Salvati",shares:"Condivisioni",download:"Scarica",premium:"Premium",free:"Gratuito",activatePremium:"Attiva Premium · 1 mese",noAds:"Senza pubblicità",fastDownload:"Download veloci",maxQuality:"Qualità massima",exclusiveAccess:"Accesso esclusivo",commercialLicense:"Licenza commerciale",watchAd:"Guarda un annuncio e scarica",waitSec:"Attendi",adLabel:"PUBBLICITÀ",myFavs:"I miei preferiti",noFavsYet:"Scorri e tocca ⭐ per salvare.",myPlaylists:"Le mie playlist",createPlaylist:"+ Crea",newPlaylist:"Nuova playlist",playlistName:"Nome playlist…",public:"Pubblica",private:"Privata",collaborative:"Collaborativa",recentlyPlayed:"Riprodotti di recente",recentDownloads:"Download recenti",recentFavs:"Preferiti recenti",lastSearches:"Ultime ricerche",noActivity:"Nessuna attività ancora.",totalPlays:"Riproduzioni totali",totalTime:"Tempo di ascolto",downloads:"Download",tokensEarned:"Token guadagnati",tokensSpent:"Token spesi",memberSince:"Membro dal",editProfile:"Modifica profilo",save:"Salva",cancel:"Annulla",pseudo:"Utente",email:"Email",password:"Password",bio:"Bio",profilePhoto:"Foto profilo",connectedDevices:"Dispositivi connessi",loginHistory:"Cronologia accessi",deleteAccount:"Elimina account",logout:"Disconnetti",language:"Lingua",theme:"Tema",accessibility:"Accessibilità",darkMode:"Modalità scura",textSize:"Dimensione testo",reduceAnimations:"Riduci animazioni",faq:"FAQ",contactSupport:"Contatta supporto",reportProblem:"Segnala un problema",termsOfUse:"Termini di utilizzo",privacyPolicy:"Privacy",newLike:"ha messo mi piace al tuo beat",newComment:"ha commentato",newFollower:"ti segue ora",tokenReward:"Hai guadagnato token!",premiumPromo:"Offerta Premium disponibile",newMusic:"Nuovo suono disponibile",markAllRead:"Segna tutto come letto",noNotifs:"Nessuna notifica.",offlineAvailable:"Disponibile offline",offlineNote:"Suoni scaricati accessibili senza Internet.",feature:"Funzione",premiumBadge:"Badge Premium",deleteConfirm:"Eliminare definitivamente?",deleteWarning:"Questa azione è irreversibile.",confirmDelete:"Sì, elimina",addFirstComment:"Sii il primo a commentare!",addComment:"Aggiungi commento…",plays:"riproduzioni",exclusive:"💎 Esclusivo Premium",byGenre:"Esplora per genere",recentlyListened:"Ascoltati di recente",continueAsFree:"Continua gratis",premiumTitle:"BeatMarket Premium",premiumSubtitle:"L'esperienza musicale senza limiti",premiumActive:"Premium attivo",activeUntil:"Attivo fino al",splashLoading:"Caricamento…",onboardingTitle:"Quali generi ti piacciono?",onboardingSub:"Personalizziamo il tuo feed ora.",enter:"🚀 Entra nell'universo",skip:"Salta",downloadNow:"⬇️ Scarica ora",downloaded:"scaricato!",linkCopied:"Link copiato!",savedToFavs:"Salvato!",removedFromFavs:"Rimosso dai preferiti",premiumActivated:"👑 Premium attivato!",premiumDownload:"⬇️ Download Premium avviato!",featureUnavailableOffline:"Funzione non disponibile offline",faqItems:[{q:"Come scaricare un beat?",a:"Tocca ⬇️, guarda un breve annuncio (gratis) o scarica istantaneamente con Premium."},{q:"Cos'è la licenza commerciale?",a:"Ti permette di monetizzare i tuoi video. Solo con Premium."},{q:"Come guadagnare token?",a:"Ascolta, commenta, condividi. Ogni azione ti dà token."},{q:"Come cancellare Premium?",a:"Vai in Impostazioni > Premium > Annulla abbonamento."}]}},
  zh:{name:"中文",flag:"🇨🇳",dir:"ltr",t:{appName:"BeatMarket",tagline:"聆听。发现。创作。",forYou:"为你",following:"关注",search:"搜索",searchPlaceholder:"标题、艺术家、风格…",noResults:"无结果",feed:"首页",favs:"收藏",playlists:"歌单",activity:"动态",profile:"我的",settings:"设置",notifications:"通知",help:"帮助",playing:"播放中",next:"下一个",pause:"暂停",play:"播放",likes:"点赞",comments:"评论",saves:"收藏",shares:"分享",download:"下载",premium:"会员",free:"免费",activatePremium:"开通会员 · 1个月",noAds:"无广告",fastDownload:"快速下载",maxQuality:"最高音质",exclusiveAccess:"专属内容",commercialLicense:"商业授权",watchAd:"看广告下载",waitSec:"等待",adLabel:"广告",myFavs:"我的收藏",noFavsYet:"滑动并点击 ⭐ 收藏。",myPlaylists:"我的歌单",createPlaylist:"+ 创建",newPlaylist:"新歌单",playlistName:"歌单名称…",public:"公开",private:"私密",collaborative:"协作",recentlyPlayed:"最近播放",recentDownloads:"最近下载",recentFavs:"最近收藏",lastSearches:"最近搜索",noActivity:"暂无动态。",totalPlays:"总播放次数",totalTime:"听歌时长",downloads:"下载次数",tokensEarned:"已赚积分",tokensSpent:"已用积分",memberSince:"加入时间",editProfile:"编辑资料",save:"保存",cancel:"取消",pseudo:"用户名",email:"邮箱",password:"密码",bio:"简介",profilePhoto:"头像",connectedDevices:"已连接设备",loginHistory:"登录记录",deleteAccount:"删除账户",logout:"退出登录",language:"语言",theme:"主题",accessibility:"无障碍",darkMode:"深色模式",textSize:"字体大小",reduceAnimations:"减少动画",faq:"常见问题",contactSupport:"联系客服",reportProblem:"反馈问题",termsOfUse:"使用条款",privacyPolicy:"隐私政策",newLike:"赞了你的beat",newComment:"评论了",newFollower:"关注了你",tokenReward:"你赚到积分了！",premiumPromo:"会员优惠来了",newMusic:"新音乐上线",markAllRead:"全部标为已读",noNotifs:"暂无通知。",offlineAvailable:"可离线使用",offlineNote:"已下载音乐可离线播放。",feature:"功能",premiumBadge:"会员徽章",deleteConfirm:"确认永久删除？",deleteWarning:"此操作不可撤销。",confirmDelete:"是，删除",addFirstComment:"来第一个评论吧！",addComment:"添加评论…",plays:"次播放",exclusive:"💎 会员专属",byGenre:"按风格探索",recentlyListened:"最近听过",continueAsFree:"免费继续",premiumTitle:"BeatMarket 会员",premiumSubtitle:"无限音乐体验",premiumActive:"会员激活中",activeUntil:"有效期至",splashLoading:"加载中…",onboardingTitle:"你喜欢哪些风格？",onboardingSub:"我们现在为你个性化推荐。",enter:"🚀 进入世界",skip:"跳过",downloadNow:"⬇️ 立即下载",downloaded:"已下载！",linkCopied:"链接已复制！",savedToFavs:"已收藏！",removedFromFavs:"已取消收藏",premiumActivated:"👑 会员已激活！",premiumDownload:"⬇️ 会员下载已开始！",featureUnavailableOffline:"离线时功能不可用",faqItems:[{q:"如何下载beat？",a:"点击 ⬇️，观看短广告（免费）或使用会员立即下载。"},{q:"什么是商业授权？",a:"允许你在YouTube、TikTok等平台盈利。仅限会员。"},{q:"如何赚积分？",a:"听歌、评论、分享。每个操作都能赚积分。"},{q:"如何取消会员？",a:"前往设置 > 会员 > 取消订阅。"}]}},
  ja:{name:"日本語",flag:"🇯🇵",dir:"ltr",t:{appName:"BeatMarket",tagline:"聴く。発見する。創る。",forYou:"おすすめ",following:"フォロー中",search:"検索",searchPlaceholder:"タイトル、アーティスト、ジャンル…",noResults:"結果なし",feed:"フィード",favs:"お気に入り",playlists:"プレイリスト",activity:"アクティビティ",profile:"プロフィール",settings:"設定",notifications:"通知",help:"ヘルプ",playing:"再生中",next:"次へ",pause:"一時停止",play:"再生",likes:"いいね",comments:"コメント",saves:"保存",shares:"シェア",download:"ダウンロード",premium:"プレミアム",free:"無料",activatePremium:"プレミアム有効化・1ヶ月",noAds:"広告なし",fastDownload:"高速DL",maxQuality:"最高音質",exclusiveAccess:"限定アクセス",commercialLicense:"商用ライセンス",watchAd:"広告を見てDL",waitSec:"待機",adLabel:"広告",myFavs:"お気に入り",noFavsYet:"スワイプして⭐をタップ",myPlaylists:"プレイリスト",createPlaylist:"＋作成",newPlaylist:"新しいリスト",playlistName:"名前を入力…",public:"公開",private:"非公開",collaborative:"共同",recentlyPlayed:"最近再生",recentDownloads:"最近のDL",recentFavs:"最近の保存",lastSearches:"最近の検索",noActivity:"アクティビティなし",totalPlays:"総再生数",totalTime:"再生時間",downloads:"DL数",tokensEarned:"獲得トークン",tokensSpent:"使用トークン",memberSince:"加入日",editProfile:"編集",save:"保存",cancel:"キャンセル",pseudo:"ユーザー名",email:"メール",password:"パスワード",bio:"自己紹介",profilePhoto:"プロフ画像",connectedDevices:"接続デバイス",loginHistory:"ログイン履歴",deleteAccount:"アカウント削除",logout:"ログアウト",language:"言語",theme:"テーマ",accessibility:"アクセシビリティ",darkMode:"ダークモード",textSize:"文字サイズ",reduceAnimations:"アニメ軽減",faq:"よくある質問",contactSupport:"サポート",reportProblem:"問題を報告",termsOfUse:"利用規約",privacyPolicy:"プライバシー",newLike:"いいねされました",newComment:"コメントされました",newFollower:"フォローされました",tokenReward:"トークンを獲得！",premiumPromo:"プレミアム特典",newMusic:"新曲追加",markAllRead:"全て既読",noNotifs:"通知なし",offlineAvailable:"オフライン対応",offlineNote:"DL済みの曲はオフラインで再生可",feature:"機能",premiumBadge:"バッジ",deleteConfirm:"完全に削除？",deleteWarning:"この操作は元に戻せません",confirmDelete:"削除する",addFirstComment:"最初のコメントを書こう！",addComment:"コメントを追加…",plays:"再生",exclusive:"💎 限定",byGenre:"ジャンル別",recentlyListened:"最近聴いた",continueAsFree:"無料で続ける",premiumTitle:"BeatMarket プレミアム",premiumSubtitle:"無限の音楽体験",premiumActive:"有効中",activeUntil:"有効期限",splashLoading:"読み込み中…",onboardingTitle:"好きなジャンルは？",onboardingSub:"今すぐフィードをカスタマイズ。",enter:"🚀 入る",skip:"スキップ",downloadNow:"⬇️ ダウンロード",downloaded:"DL完了！",linkCopied:"コピー完了！",savedToFavs:"保存完了！",removedFromFavs:"削除しました",premiumActivated:"👑 有効化完了！",premiumDownload:"⬇️ プレミアムDL開始！",featureUnavailableOffline:"オフラインでは使用不可",faqItems:[{q:"beatのDL方法？",a:"⬇️をタップ、広告視聴（無料）またはプレミアムで即DL。"},{q:"商用ライセンスとは？",a:"YouTube/TikTokなどの収益化に使用可。プレミアムのみ。"},{q:"トークンの獲得方法？",a:"再生・コメント・シェアでトークン獲得。"},{q:"プレミアムの解約？",a:"設定 > プレミアム > 解約。"}]}},
  ko:{name:"한국어",flag:"🇰🇷",dir:"ltr",t:{appName:"BeatMarket",tagline:"듣다. 발견하다. 만들다.",forYou:"추천",following:"팔로잉",search:"검색",searchPlaceholder:"제목, 아티스트, 장르…",noResults:"결과 없음",feed:"피드",favs:"즐겨찾기",playlists:"플레이리스트",activity:"활동",profile:"프로필",settings:"설정",notifications:"알림",help:"도움말",playing:"재생 중",next:"다음",pause:"일시정지",play:"재생",likes:"좋아요",comments:"댓글",saves:"저장",shares:"공유",download:"다운로드",premium:"프리미엄",free:"무료",activatePremium:"프리미엄 활성화 · 1개월",noAds:"광고 없음",fastDownload:"빠른 다운로드",maxQuality:"최고 음질",exclusiveAccess:"독점 이용",commercialLicense:"상업 라이선스",watchAd:"광고 보고 다운로드",waitSec:"대기",adLabel:"광고",myFavs:"내 즐겨찾기",noFavsYet:"스와이프하고 ⭐을 눌러 저장하세요.",myPlaylists:"내 플레이리스트",createPlaylist:"+ 만들기",newPlaylist:"새 플레이리스트",playlistName:"이름 입력…",public:"공개",private:"비공개",collaborative:"협업",recentlyPlayed:"최근 재생",recentDownloads:"최근 다운로드",recentFavs:"최근 즐겨찾기",lastSearches:"최근 검색",noActivity:"아직 활동이 없습니다.",totalPlays:"총 재생수",totalTime:"총 청취 시간",downloads:"다운로드",tokensEarned:"획득 토큰",tokensSpent:"사용 토큰",memberSince:"가입일",editProfile:"프로필 편집",save:"저장",cancel:"취소",pseudo:"사용자명",email:"이메일",password:"비밀번호",bio:"소개",profilePhoto:"프로필 사진",connectedDevices:"연결된 기기",loginHistory:"로그인 기록",deleteAccount:"계정 삭제",logout:"로그아웃",language:"언어",theme:"테마",accessibility:"접근성",darkMode:"다크 모드",textSize:"글자 크기",reduceAnimations:"애니메이션 줄이기",faq:"자주 묻는 질문",contactSupport:"고객지원",reportProblem:"문제 신고",termsOfUse:"이용약관",privacyPolicy:"개인정보처리방침",newLike:"비트에 좋아요를 눌렀습니다",newComment:"댓글을 달았습니다",newFollower:"팔로우했습니다",tokenReward:"토큰을 획득했습니다!",premiumPromo:"프리미엄 혜택 이용 가능",newMusic:"새 음악이 추가되었습니다",markAllRead:"모두 읽음 표시",noNotifs:"알림이 없습니다.",offlineAvailable:"오프라인 이용 가능",offlineNote:"다운로드한 음악은 인터넷 없이 재생 가능합니다.",feature:"기능",premiumBadge:"프리미엄 배지",deleteConfirm:"영구 삭제?",deleteWarning:"이 작업은 되돌릴 수 없습니다.",confirmDelete:"예, 삭제",addFirstComment:"첫 댓글을 달아보세요!",addComment:"댓글 추가…",plays:"재생",exclusive:"💎 프리미엄 단독",byGenre:"장르별 탐색",recentlyListened:"최근 청취",continueAsFree:"무료로 계속",premiumTitle:"BeatMarket 프리미엄",premiumSubtitle:"무한한 음악 경험",premiumActive:"프리미엄 활성",activeUntil:"~까지 유효",splashLoading:"불러오는 중…",onboardingTitle:"어떤 장르를 좋아하세요?",onboardingSub:"지금 바로 피드를 맞춤 설정합니다.",enter:"🚀 세계에 입장",skip:"건너뛰기",downloadNow:"⬇️ 지금 다운로드",downloaded:"다운로드됨!",linkCopied:"링크 복사됨!",savedToFavs:"저장됨!",removedFromFavs:"즐겨찾기에서 제거됨",premiumActivated:"👑 프리미엄 활성화됨!",premiumDownload:"⬇️ 프리미엄 다운로드 시작!",featureUnavailableOffline:"오프라인에서 사용 불가",faqItems:[{q:"비트 다운로드 방법?",a:"⬇️ 탭 후 짧은 광고 시청(무료) 또는 프리미엄으로 즉시 다운로드."},{q:"상업 라이선스란?",a:"YouTube, TikTok 등 수익화에 사용 가능. 프리미엄 전용."},{q:"토큰 획득 방법?",a:"듣기, 댓글, 공유. 모든 활동이 토큰을 줍니다."},{q:"프리미엄 취소?",a:"설정 > 프리미엄 > 구독 취소."}]}},
  ru:{name:"Русский",flag:"🇷🇺",dir:"ltr",t:{appName:"BeatMarket",tagline:"Слушай. Открывай. Создавай.",forYou:"Для тебя",following:"Подписки",search:"Поиск",searchPlaceholder:"Название, артист, жанр…",noResults:"Нет результатов",feed:"ЛЕНТА",favs:"ИЗБРАННОЕ",playlists:"ПЛЕЙЛИСТЫ",activity:"АКТИВНОСТЬ",profile:"ПРОФИЛЬ",settings:"Настройки",notifications:"Уведомления",help:"Помощь",playing:"ИГРАЕТ",next:"Следующий",pause:"Пауза",play:"Играть",likes:"Лайки",comments:"Комментарии",saves:"Сохранено",shares:"Поделиться",download:"Скачать",premium:"Премиум",free:"Бесплатно",activatePremium:"Активировать Премиум · 1 месяц",noAds:"Без рекламы",fastDownload:"Быстрые загрузки",maxQuality:"Максимальное качество",exclusiveAccess:"Эксклюзивный доступ",commercialLicense:"Коммерческая лицензия",watchAd:"Посмотреть рекламу и скачать",waitSec:"Подождите",adLabel:"РЕКЛАМА",myFavs:"Моё избранное",noFavsYet:"Свайп и нажми ⭐ для сохранения.",myPlaylists:"Мои плейлисты",createPlaylist:"+ Создать",newPlaylist:"Новый плейлист",playlistName:"Название плейлиста…",public:"Публичный",private:"Приватный",collaborative:"Совместный",recentlyPlayed:"Недавно слушал",recentDownloads:"Недавние загрузки",recentFavs:"Недавнее избранное",lastSearches:"Последние поиски",noActivity:"Пока нет активности.",totalPlays:"Всего прослушиваний",totalTime:"Время прослушивания",downloads:"Загрузки",tokensEarned:"Заработано токенов",tokensSpent:"Потрачено токенов",memberSince:"Участник с",editProfile:"Редактировать профиль",save:"Сохранить",cancel:"Отмена",pseudo:"Имя пользователя",email:"Email",password:"Пароль",bio:"О себе",profilePhoto:"Фото профиля",connectedDevices:"Подключённые устройства",loginHistory:"История входов",deleteAccount:"Удалить аккаунт",logout:"Выйти",language:"Язык",theme:"Тема",accessibility:"Доступность",darkMode:"Тёмная тема",textSize:"Размер текста",reduceAnimations:"Меньше анимаций",faq:"FAQ",contactSupport:"Поддержка",reportProblem:"Сообщить о проблеме",termsOfUse:"Условия использования",privacyPolicy:"Конфиденциальность",newLike:"лайкнул ваш бит",newComment:"прокомментировал",newFollower:"теперь подписан на вас",tokenReward:"Вы заработали токены!",premiumPromo:"Доступно предложение Premium",newMusic:"Новый трек доступен",markAllRead:"Отметить всё прочитанным",noNotifs:"Нет уведомлений.",offlineAvailable:"Доступно офлайн",offlineNote:"Скачанные треки доступны без интернета.",feature:"Функция",premiumBadge:"Значок Premium",deleteConfirm:"Удалить навсегда?",deleteWarning:"Это действие необратимо.",confirmDelete:"Да, удалить",addFirstComment:"Оставьте первый комментарий!",addComment:"Добавить комментарий…",plays:"прослушиваний",exclusive:"💎 Эксклюзив Premium",byGenre:"Исследовать по жанру",recentlyListened:"Недавно слушал",continueAsFree:"Продолжить бесплатно",premiumTitle:"BeatMarket Premium",premiumSubtitle:"Безлимитный музыкальный опыт",premiumActive:"Premium активен",activeUntil:"Активен до",splashLoading:"Загрузка…",onboardingTitle:"Какие жанры тебе нравятся?",onboardingSub:"Персонализируем ленту прямо сейчас.",enter:"🚀 Войти в мир",skip:"Пропустить",downloadNow:"⬇️ Скачать сейчас",downloaded:"скачан!",linkCopied:"Ссылка скопирована!",savedToFavs:"Сохранено!",removedFromFavs:"Удалено из избранного",premiumActivated:"👑 Premium активирован!",premiumDownload:"⬇️ Загрузка Premium началась!",featureUnavailableOffline:"Функция недоступна офлайн",faqItems:[{q:"Как скачать бит?",a:"Нажмите ⬇️, посмотрите короткую рекламу (бесплатно) или скачайте мгновенно с Premium."},{q:"Что такое коммерческая лицензия?",a:"Позволяет монетизировать видео на YouTube/TikTok. Только с Premium."},{q:"Как заработать токены?",a:"Слушайте, комментируйте, делитесь. Каждое действие приносит токены."},{q:"Как отменить Premium?",a:"Настройки > Premium > Отменить подписку."}]}},
  tr:{name:"Türkçe",flag:"🇹🇷",dir:"ltr",t:{appName:"BeatMarket",tagline:"Dinle. Keşfet. Yarat.",forYou:"Sana Özel",following:"Takip",search:"Ara",searchPlaceholder:"Başlık, sanatçı, tür…",noResults:"Sonuç yok",feed:"AKIŞ",favs:"FAVORİLER",playlists:"ÇALMA LİSTELERİ",activity:"ETKİNLİK",profile:"PROFİL",settings:"Ayarlar",notifications:"Bildirimler",help:"Yardım",playing:"ÇALIYOR",next:"Sıradaki",pause:"Duraklat",play:"Oynat",likes:"Beğeniler",comments:"Yorumlar",saves:"Kaydedilenler",shares:"Paylaşımlar",download:"İndir",premium:"Premium",free:"Ücretsiz",activatePremium:"Premium'u Etkinleştir · 1 ay",noAds:"Reklamsız",fastDownload:"Hızlı indirme",maxQuality:"Maksimum kalite",exclusiveAccess:"Özel erişim",commercialLicense:"Ticari lisans",watchAd:"Reklam izle ve indir",waitSec:"Bekle",adLabel:"REKLAM",myFavs:"Favorilerim",noFavsYet:"Kaydırmak ve ⭐ dokunmak için.",myPlaylists:"Çalma listelerim",createPlaylist:"+ Oluştur",newPlaylist:"Yeni liste",playlistName:"Liste adı…",public:"Herkese Açık",private:"Özel",collaborative:"Ortak",recentlyPlayed:"Son Çalınanlar",recentDownloads:"Son İndirmeler",recentFavs:"Son Favoriler",lastSearches:"Son Aramalar",noActivity:"Henüz etkinlik yok.",totalPlays:"Toplam Oynatma",totalTime:"Dinleme Süresi",downloads:"İndirmeler",tokensEarned:"Kazanılan Jeton",tokensSpent:"Harcanan Jeton",memberSince:"Üyelik Tarihi",editProfile:"Profili Düzenle",save:"Kaydet",cancel:"İptal",pseudo:"Kullanıcı Adı",email:"E-posta",password:"Şifre",bio:"Biyografi",profilePhoto:"Profil Fotoğrafı",connectedDevices:"Bağlı Cihazlar",loginHistory:"Giriş Geçmişi",deleteAccount:"Hesabı Sil",logout:"Çıkış Yap",language:"Dil",theme:"Tema",accessibility:"Erişilebilirlik",darkMode:"Karanlık Mod",textSize:"Metin Boyutu",reduceAnimations:"Animasyonları Azalt",faq:"SSS",contactSupport:"Destek",reportProblem:"Sorun Bildir",termsOfUse:"Kullanım Koşulları",privacyPolicy:"Gizlilik",newLike:"beatini beğendi",newComment:"yorum yaptı",newFollower:"artık sizi takip ediyor",tokenReward:"Jeton kazandınız!",premiumPromo:"Premium teklifi mevcut",newMusic:"Yeni ses eklendi",markAllRead:"Tümünü okundu işaretle",noNotifs:"Bildirim yok.",offlineAvailable:"Çevrimdışı kullanılabilir",offlineNote:"İndirilen sesler internetsiz erişilebilir.",feature:"Özellik",premiumBadge:"Premium Rozeti",deleteConfirm:"Kalıcı olarak silmek istiyor musun?",deleteWarning:"Bu işlem geri alınamaz.",confirmDelete:"Evet, sil",addFirstComment:"İlk yorumu yap!",addComment:"Yorum ekle…",plays:"oynatma",exclusive:"💎 Premium Özel",byGenre:"Türe göre keşfet",recentlyListened:"Son dinlenenler",continueAsFree:"Ücretsiz devam et",premiumTitle:"BeatMarket Premium",premiumSubtitle:"Sınırsız müzik deneyimi",premiumActive:"Premium aktif",activeUntil:"Aktif tarihine kadar",splashLoading:"Yükleniyor…",onboardingTitle:"Hangi türleri seviyorsun?",onboardingSub:"Akışını hemen kişiselleştiriyoruz.",enter:"🚀 Evrene gir",skip:"Atla",downloadNow:"⬇️ Şimdi indir",downloaded:"indirildi!",linkCopied:"Bağlantı kopyalandı!",savedToFavs:"Kaydedildi!",removedFromFavs:"Favorilerden kaldırıldı",premiumActivated:"👑 Premium aktifleştirildi!",premiumDownload:"⬇️ Premium indirmesi başladı!",featureUnavailableOffline:"Çevrimdışıyken özellik kullanılamaz",faqItems:[{q:"Beat nasıl indirilir?",a:"⬇️'a dokun, kısa reklam izle (ücretsiz) veya Premium ile anında indir."},{q:"Ticari lisans nedir?",a:"YouTube/TikTok videolarını para kazanmak için kullanmanı sağlar. Sadece Premium."},{q:"Jeton nasıl kazanılır?",a:"Dinle, yorum yap, paylaş. Her eylem jeton kazandırır."},{q:"Premium nasıl iptal edilir?",a:"Ayarlar > Premium > Aboneliği iptal et."}]}},
  hi:{name:"हिन्दी",flag:"🇮🇳",dir:"ltr",t:{appName:"BeatMarket",tagline:"सुनो। खोजो। बनाओ।",forYou:"आपके लिए",following:"फ़ॉलोइंग",search:"खोजें",searchPlaceholder:"शीर्षक, कलाकार, शैली…",noResults:"कोई परिणाम नहीं",feed:"फ़ीड",favs:"पसंदीदा",playlists:"प्लेलिस्ट",activity:"गतिविधि",profile:"प्रोफ़ाइल",settings:"सेटिंग्स",notifications:"सूचनाएँ",help:"सहायता",playing:"चल रहा है",next:"अगला",pause:"रोकें",play:"चलाएं",likes:"लाइक्स",comments:"टिप्पणियाँ",saves:"सहेजे गए",shares:"शेयर",download:"डाउनलोड",premium:"प्रीमियम",free:"मुफ़्त",activatePremium:"प्रीमियम सक्रिय करें · 1 माह",noAds:"कोई विज्ञापन नहीं",fastDownload:"तेज़ डाउनलोड",maxQuality:"अधिकतम गुणवत्ता",exclusiveAccess:"विशेष पहुँच",commercialLicense:"व्यावसायिक लाइसेंस",watchAd:"विज्ञापन देखें और डाउनलोड करें",waitSec:"प्रतीक्षा करें",adLabel:"विज्ञापन",myFavs:"मेरे पसंदीदा",noFavsYet:"स्वाइप करें और ⭐ दबाएँ।",myPlaylists:"मेरी प्लेलिस्ट",createPlaylist:"+ बनाएं",newPlaylist:"नई प्लेलिस्ट",playlistName:"नाम…",public:"सार्वजनिक",private:"निजी",collaborative:"सहयोगी",recentlyPlayed:"हाल ही में सुने गए",recentDownloads:"हाल के डाउनलोड",recentFavs:"हाल के पसंदीदा",lastSearches:"हाल की खोजें",noActivity:"अभी कोई गतिविधि नहीं।",totalPlays:"कुल प्ले",totalTime:"सुनने का समय",downloads:"डाउनलोड",tokensEarned:"अर्जित टोकन",tokensSpent:"खर्च किए टोकन",memberSince:"सदस्य तब से",editProfile:"प्रोफ़ाइल संपादित करें",save:"सहेजें",cancel:"रद्द करें",pseudo:"उपयोगकर्ता नाम",email:"ईमेल",password:"पासवर्ड",bio:"बायो",profilePhoto:"प्रोफ़ाइल फ़ोटो",connectedDevices:"कनेक्टेड डिवाइस",loginHistory:"लॉगिन इतिहास",deleteAccount:"खाता हटाएँ",logout:"लॉगआउट",language:"भाषा",theme:"थीम",accessibility:"पहुँच-योग्यता",darkMode:"डार्क मोड",textSize:"पाठ आकार",reduceAnimations:"एनिमेशन कम करें",faq:"अक्सर पूछे जाने वाले प्रश्न",contactSupport:"सहायता से संपर्क करें",reportProblem:"समस्या रिपोर्ट करें",termsOfUse:"उपयोग की शर्तें",privacyPolicy:"गोपनीयता नीति",newLike:"ने आपका बीट पसंद किया",newComment:"ने टिप्पणी की",newFollower:"अब आपको फ़ॉलो कर रहा है",tokenReward:"आपने टोकन अर्जित किए!",premiumPromo:"प्रीमियम ऑफ़र उपलब्ध",newMusic:"नई ध्वनि उपलब्ध",markAllRead:"सभी को पढ़ा हुआ चिह्नित करें",noNotifs:"कोई सूचना नहीं।",offlineAvailable:"ऑफलाइन उपलब्ध",offlineNote:"डाउनलोड की गई ध्वनियाँ बिना इंटरनेट के चलती हैं।",feature:"सुविधा",premiumBadge:"प्रीमियम बैज",deleteConfirm:"स्थायी रूप से हटाएँ?",deleteWarning:"यह क्रिया अपरिवर्तनीय है।",confirmDelete:"हाँ, हटाएँ",addFirstComment:"पहली टिप्पणी करें!",addComment:"टिप्पणी जोड़ें…",plays:"प्ले",exclusive:"💎 प्रीमियम एक्सक्लूसिव",byGenre:"शैली के अनुसार",recentlyListened:"हाल में सुने",continueAsFree:"मुफ़्त जारी रखें",premiumTitle:"BeatMarket प्रीमियम",premiumSubtitle:"असीमित संगीत अनुभव",premiumActive:"प्रीमियम सक्रिय",activeUntil:"तक सक्रिय",splashLoading:"लोड हो रहा है…",onboardingTitle:"आप कौन सी शैलियाँ पसंद करते हैं?",onboardingSub:"हम अभी आपका फ़ीड व्यक्तिगत बनाएंगे।",enter:"🚀 ब्रह्मांड में प्रवेश करें",skip:"छोड़ें",downloadNow:"⬇️ अभी डाउनलोड करें",downloaded:"डाउनलोड हुआ!",linkCopied:"लिंक कॉपी हुआ!",savedToFavs:"सहेजा गया!",removedFromFavs:"पसंदीदा से हटाया गया",premiumActivated:"👑 प्रीमियम सक्रिय!",premiumDownload:"⬇️ प्रीमियम डाउनलोड शुरू!",featureUnavailableOffline:"ऑफलाइन में सुविधा उपलब्ध नहीं",faqItems:[{q:"बीट कैसे डाउनलोड करें?",a:"⬇️ दबाएँ, छोटा विज्ञापन देखें (मुफ़्त) या प्रीमियम से तुरंत डाउनलोड करें।"},{q:"व्यावसायिक लाइसेंस क्या है?",a:"आपको YouTube/TikTok वीडियो मोनेटाइज़ करने देता है। केवल प्रीमियम।"},{q:"टोकन कैसे अर्जित करें?",a:"सुनें, टिप्पणी करें, साझा करें। हर क्रिया टोकन देती है।"},{q:"प्रीमियम कैसे रद्द करें?",a:"सेटिंग्स > प्रीमियम > सदस्यता रद्द करें।"}]}},
};

const COUNTRIES=[
  {code:"AF",name:"Afghanistan",flag:"🇦🇫"},{code:"ZA",name:"Afrique du Sud",flag:"🇿🇦"},{code:"AL",name:"Albanie",flag:"🇦🇱"},
  {code:"DE",name:"Allemagne",flag:"🇩🇪"},{code:"DZ",name:"Algérie",flag:"🇩🇿"},{code:"AD",name:"Andorre",flag:"🇦🇩"},
  {code:"AO",name:"Angola",flag:"🇦🇴"},{code:"AG",name:"Antigua-et-Barbuda",flag:"🇦🇬"},{code:"SA",name:"Arabie Saoudite",flag:"🇸🇦"},
  {code:"AR",name:"Argentine",flag:"🇦🇷"},{code:"AM",name:"Arménie",flag:"🇦🇲"},{code:"AU",name:"Australie",flag:"🇦🇺"},
  {code:"AT",name:"Autriche",flag:"🇦🇹"},{code:"AZ",name:"Azerbaïdjan",flag:"🇦🇿"},{code:"BS",name:"Bahamas",flag:"🇧🇸"},
  {code:"BH",name:"Bahreïn",flag:"🇧🇭"},{code:"BD",name:"Bangladesh",flag:"🇧🇩"},{code:"BB",name:"Barbade",flag:"🇧🇧"},
  {code:"BE",name:"Belgique",flag:"🇧🇪"},{code:"BZ",name:"Belize",flag:"🇧🇿"},{code:"BJ",name:"Bénin",flag:"🇧🇯"},
  {code:"BT",name:"Bhoutan",flag:"🇧🇹"},{code:"BY",name:"Biélorussie",flag:"🇧🇾"},{code:"MM",name:"Birmanie",flag:"🇲🇲"},
  {code:"BO",name:"Bolivie",flag:"🇧🇴"},{code:"BA",name:"Bosnie-Herzégovine",flag:"🇧🇦"},{code:"BW",name:"Botswana",flag:"🇧🇼"},
  {code:"BR",name:"Brésil",flag:"🇧🇷"},{code:"BN",name:"Brunei",flag:"🇧🇳"},{code:"BG",name:"Bulgarie",flag:"🇧🇬"},
  {code:"BF",name:"Burkina Faso",flag:"🇧🇫"},{code:"BI",name:"Burundi",flag:"🇧🇮"},{code:"KH",name:"Cambodge",flag:"🇰🇭"},
  {code:"CM",name:"Cameroun",flag:"🇨🇲"},{code:"CA",name:"Canada",flag:"🇨🇦"},{code:"CV",name:"Cap-Vert",flag:"🇨🇻"},
  {code:"CF",name:"République centrafricaine",flag:"🇨🇫"},{code:"CL",name:"Chili",flag:"🇨🇱"},{code:"CN",name:"Chine",flag:"🇨🇳"},
  {code:"CY",name:"Chypre",flag:"🇨🇾"},{code:"CO",name:"Colombie",flag:"🇨🇴"},{code:"KM",name:"Comores",flag:"🇰🇲"},
  {code:"CG",name:"Congo",flag:"🇨🇬"},{code:"CD",name:"RD Congo",flag:"🇨🇩"},{code:"KR",name:"Corée du Sud",flag:"🇰🇷"},
  {code:"KP",name:"Corée du Nord",flag:"🇰🇵"},{code:"CR",name:"Costa Rica",flag:"🇨🇷"},{code:"CI",name:"Côte d'Ivoire",flag:"🇨🇮"},
  {code:"HR",name:"Croatie",flag:"🇭🇷"},{code:"CU",name:"Cuba",flag:"🇨🇺"},{code:"DK",name:"Danemark",flag:"🇩🇰"},
  {code:"DJ",name:"Djibouti",flag:"🇩🇯"},{code:"DM",name:"Dominique",flag:"🇩🇲"},{code:"EG",name:"Égypte",flag:"🇪🇬"},
  {code:"AE",name:"Émirats Arabes Unis",flag:"🇦🇪"},{code:"EC",name:"Équateur",flag:"🇪🇨"},{code:"ER",name:"Érythrée",flag:"🇪🇷"},
  {code:"ES",name:"Espagne",flag:"🇪🇸"},{code:"EE",name:"Estonie",flag:"🇪🇪"},{code:"SZ",name:"Eswatini",flag:"🇸🇿"},
  {code:"US",name:"États-Unis",flag:"🇺🇸"},{code:"ET",name:"Éthiopie",flag:"🇪🇹"},{code:"FJ",name:"Fidji",flag:"🇫🇯"},
  {code:"FI",name:"Finlande",flag:"🇫🇮"},{code:"FR",name:"France",flag:"🇫🇷"},{code:"GA",name:"Gabon",flag:"🇬🇦"},
  {code:"GM",name:"Gambie",flag:"🇬🇲"},{code:"GE",name:"Géorgie",flag:"🇬🇪"},{code:"GH",name:"Ghana",flag:"🇬🇭"},
  {code:"GR",name:"Grèce",flag:"🇬🇷"},{code:"GD",name:"Grenade",flag:"🇬🇩"},{code:"GT",name:"Guatemala",flag:"🇬🇹"},
  {code:"GN",name:"Guinée",flag:"🇬🇳"},{code:"GQ",name:"Guinée équatoriale",flag:"🇬🇶"},{code:"GW",name:"Guinée-Bissau",flag:"🇬🇼"},
  {code:"GY",name:"Guyana",flag:"🇬🇾"},{code:"HT",name:"Haïti",flag:"🇭🇹"},{code:"HN",name:"Honduras",flag:"🇭🇳"},
  {code:"HU",name:"Hongrie",flag:"🇭🇺"},{code:"IN",name:"Inde",flag:"🇮🇳"},{code:"ID",name:"Indonésie",flag:"🇮🇩"},
  {code:"IQ",name:"Irak",flag:"🇮🇶"},{code:"IR",name:"Iran",flag:"🇮🇷"},{code:"IE",name:"Irlande",flag:"🇮🇪"},
  {code:"IS",name:"Islande",flag:"🇮🇸"},{code:"IL",name:"Israël",flag:"🇮🇱"},{code:"IT",name:"Italie",flag:"🇮🇹"},
  {code:"JM",name:"Jamaïque",flag:"🇯🇲"},{code:"JP",name:"Japon",flag:"🇯🇵"},{code:"JO",name:"Jordanie",flag:"🇯🇴"},
  {code:"KZ",name:"Kazakhstan",flag:"🇰🇿"},{code:"KE",name:"Kenya",flag:"🇰🇪"},{code:"KG",name:"Kirghizistan",flag:"🇰🇬"},
  {code:"KI",name:"Kiribati",flag:"🇰🇮"},{code:"KW",name:"Koweït",flag:"🇰🇼"},{code:"LA",name:"Laos",flag:"🇱🇦"},
  {code:"LS",name:"Lesotho",flag:"🇱🇸"},{code:"LV",name:"Lettonie",flag:"🇱🇻"},{code:"LB",name:"Liban",flag:"🇱🇧"},
  {code:"LR",name:"Liberia",flag:"🇱🇷"},{code:"LY",name:"Libye",flag:"🇱🇾"},{code:"LI",name:"Liechtenstein",flag:"🇱🇮"},
  {code:"LT",name:"Lituanie",flag:"🇱🇹"},{code:"LU",name:"Luxembourg",flag:"🇱🇺"},{code:"MK",name:"Macédoine du Nord",flag:"🇲🇰"},
  {code:"MG",name:"Madagascar",flag:"🇲🇬"},{code:"MY",name:"Malaisie",flag:"🇲🇾"},{code:"MW",name:"Malawi",flag:"🇲🇼"},
  {code:"MV",name:"Maldives",flag:"🇲🇻"},{code:"ML",name:"Mali",flag:"🇲🇱"},{code:"MT",name:"Malte",flag:"🇲🇹"},
  {code:"MA",name:"Maroc",flag:"🇲🇦"},{code:"MH",name:"Îles Marshall",flag:"🇲🇭"},{code:"MU",name:"Maurice",flag:"🇲🇺"},
  {code:"MR",name:"Mauritanie",flag:"🇲🇷"},{code:"MX",name:"Mexique",flag:"🇲🇽"},{code:"FM",name:"Micronésie",flag:"🇫🇲"},
  {code:"MD",name:"Moldavie",flag:"🇲🇩"},{code:"MC",name:"Monaco",flag:"🇲🇨"},{code:"MN",name:"Mongolie",flag:"🇲🇳"},
  {code:"ME",name:"Monténégro",flag:"🇲🇪"},{code:"MZ",name:"Mozambique",flag:"🇲🇿"},{code:"NA",name:"Namibie",flag:"🇳🇦"},
  {code:"NR",name:"Nauru",flag:"🇳🇷"},{code:"NP",name:"Népal",flag:"🇳🇵"},{code:"NI",name:"Nicaragua",flag:"🇳🇮"},
  {code:"NE",name:"Niger",flag:"🇳🇪"},{code:"NG",name:"Nigéria",flag:"🇳🇬"},{code:"NO",name:"Norvège",flag:"🇳🇴"},
  {code:"NZ",name:"Nouvelle-Zélande",flag:"🇳🇿"},{code:"OM",name:"Oman",flag:"🇴🇲"},{code:"UG",name:"Ouganda",flag:"🇺🇬"},
  {code:"UZ",name:"Ouzbékistan",flag:"🇺🇿"},{code:"PK",name:"Pakistan",flag:"🇵🇰"},{code:"PW",name:"Palaos",flag:"🇵🇼"},
  {code:"PA",name:"Panama",flag:"🇵🇦"},{code:"PG",name:"Papouasie-Nouvelle-Guinée",flag:"🇵🇬"},{code:"PY",name:"Paraguay",flag:"🇵🇾"},
  {code:"NL",name:"Pays-Bas",flag:"🇳🇱"},{code:"PE",name:"Pérou",flag:"🇵🇪"},{code:"PH",name:"Philippines",flag:"🇵🇭"},
  {code:"PL",name:"Pologne",flag:"🇵🇱"},{code:"PT",name:"Portugal",flag:"🇵🇹"},{code:"QA",name:"Qatar",flag:"🇶🇦"},
  {code:"RO",name:"Roumanie",flag:"🇷🇴"},{code:"GB",name:"Royaume-Uni",flag:"🇬🇧"},{code:"RU",name:"Russie",flag:"🇷🇺"},
  {code:"RW",name:"Rwanda",flag:"🇷🇼"},{code:"KN",name:"Saint-Christophe-et-Niévès",flag:"🇰🇳"},{code:"SM",name:"Saint-Marin",flag:"🇸🇲"},
  {code:"VC",name:"Saint-Vincent-et-les-Grenadines",flag:"🇻🇨"},{code:"LC",name:"Sainte-Lucie",flag:"🇱🇨"},{code:"SB",name:"Îles Salomon",flag:"🇸🇧"},
  {code:"SV",name:"Salvador",flag:"🇸🇻"},{code:"WS",name:"Samoa",flag:"🇼🇸"},{code:"ST",name:"Sao Tomé-et-Principe",flag:"🇸🇹"},
  {code:"SN",name:"Sénégal",flag:"🇸🇳"},{code:"RS",name:"Serbie",flag:"🇷🇸"},{code:"SC",name:"Seychelles",flag:"🇸🇨"},
  {code:"SL",name:"Sierra Leone",flag:"🇸🇱"},{code:"SG",name:"Singapour",flag:"🇸🇬"},{code:"SK",name:"Slovaquie",flag:"🇸🇰"},
  {code:"SI",name:"Slovénie",flag:"🇸🇮"},{code:"SO",name:"Somalie",flag:"🇸🇴"},{code:"SD",name:"Soudan",flag:"🇸🇩"},
  {code:"SS",name:"Soudan du Sud",flag:"🇸🇸"},{code:"LK",name:"Sri Lanka",flag:"🇱🇰"},{code:"SE",name:"Suède",flag:"🇸🇪"},
  {code:"CH",name:"Suisse",flag:"🇨🇭"},{code:"SR",name:"Suriname",flag:"🇸🇷"},{code:"SY",name:"Syrie",flag:"🇸🇾"},
  {code:"TJ",name:"Tadjikistan",flag:"🇹🇯"},{code:"TZ",name:"Tanzanie",flag:"🇹🇿"},{code:"TD",name:"Tchad",flag:"🇹🇩"},
  {code:"CZ",name:"République tchèque",flag:"🇨🇿"},{code:"TH",name:"Thaïlande",flag:"🇹🇭"},{code:"TL",name:"Timor oriental",flag:"🇹🇱"},
  {code:"TG",name:"Togo",flag:"🇹🇬"},{code:"TO",name:"Tonga",flag:"🇹🇴"},{code:"TT",name:"Trinité-et-Tobago",flag:"🇹🇹"},
  {code:"TN",name:"Tunisie",flag:"🇹🇳"},{code:"TM",name:"Turkménistan",flag:"🇹🇲"},{code:"TR",name:"Turquie",flag:"🇹🇷"},
  {code:"TV",name:"Tuvalu",flag:"🇹🇻"},{code:"UA",name:"Ukraine",flag:"🇺🇦"},{code:"UY",name:"Uruguay",flag:"🇺🇾"},
  {code:"VU",name:"Vanuatu",flag:"🇻🇺"},{code:"VA",name:"Vatican",flag:"🇻🇦"},{code:"VE",name:"Venezuela",flag:"🇻🇪"},
  {code:"VN",name:"Vietnam",flag:"🇻🇳"},{code:"YE",name:"Yémen",flag:"🇾🇪"},{code:"ZM",name:"Zambie",flag:"🇿🇲"},
  {code:"ZW",name:"Zimbabwe",flag:"🇿🇼"},
];

const THEMES={
  violet:{accent:"#9B59FF",accent2:"#C89BFF",glow:"rgba(155,89,255,0.7)",name:"Violet Néon"},
  blue:{accent:"#00AAFF",accent2:"#00DDFF",glow:"rgba(0,170,255,0.7)",name:"Bleu Électrique"},
  red:{accent:"#FF2244",accent2:"#FF6644",glow:"rgba(255,34,68,0.7)",name:"Rouge Feu"},
  green:{accent:"#00D48C",accent2:"#00FFAA",glow:"rgba(0,212,140,0.7)",name:"Vert Émeraude"},
  gold:{accent:"#FFB800",accent2:"#FFE566",glow:"rgba(255,184,0,0.7)",name:"Or Premium"},
  orange:{accent:"#FF6600",accent2:"#FF9900",glow:"rgba(255,102,0,0.7)",name:"Orange"},
  bw:{accent:"#E0E0E0",accent2:"#FFFFFF",glow:"rgba(220,220,220,0.5)",name:"Noir Élégant"},
};


const SCENES={
  Drill:{render:()=><svg width="100%" height="100%" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0}}><defs><radialGradient id="dSky" cx="40%" cy="60%" r="80%"><stop offset="0%" stopColor="#2a1400"/><stop offset="100%" stopColor="#030100"/></radialGradient></defs><rect width="400" height="700" fill="url(#dSky)"/><ellipse cx="60" cy="80" rx="90" ry="90" fill="#FF8800" opacity="0.18"/>{[0,40,80,125,170,215,260,300,345,380].map((x,i)=>{const h=120+((i*67)%150);return <rect key={i} x={x} y={420-h} width={38} height={h} fill="rgba(15,8,2,0.9)"/>})}</svg>,bg:"linear-gradient(180deg,#100600 0%,#1a0a00 30%,#030100 100%)",accent:"#FF8800"},
  Trap:{render:()=><svg width="100%" height="100%" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0}}><defs><radialGradient id="tBg" cx="50%" cy="30%" r="70%"><stop offset="0%" stopColor="#2d0845"/><stop offset="100%" stopColor="#080010"/></radialGradient></defs><rect width="400" height="700" fill="url(#tBg)"/>{[0,50,90,140,185,230,270,320,360].map((x,i)=>{const h=200+((i*61)%180);return <rect key={i} x={x} y={700-h} width={38} height={h} fill="rgba(5,0,12,0.8)"/>})}</svg>,bg:"linear-gradient(180deg,#08001a 0%,#150530 50%,#05001a 100%)",accent:"#AA44FF"},
  Afrobeat:{render:()=><svg width="100%" height="100%" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0}}><defs><radialGradient id="aSky" cx="50%" cy="20%" r="60%"><stop offset="0%" stopColor="#FF6600"/><stop offset="100%" stopColor="#050208"/></radialGradient></defs><rect width="400" height="700" fill="url(#aSky)"/><circle cx="200" cy="160" r="70" fill="#FFD700" opacity="0.2"/></svg>,bg:"linear-gradient(180deg,#200800 0%,#100400 50%,#050200 100%)",accent:"#FF8C00"},
  Piano:{render:()=><svg width="100%" height="100%" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0}}><defs><radialGradient id="pHall" cx="50%" cy="40%" r="60%"><stop offset="0%" stopColor="#1a1208"/><stop offset="100%" stopColor="#020100"/></radialGradient></defs><rect width="400" height="700" fill="url(#pHall)"/><rect x="80" y="560" width="240" height="28" rx="3" fill="rgba(240,230,210,0.92)"/></svg>,bg:"linear-gradient(180deg,#030200 0%,#0a0700 40%,#020100 100%)",accent:"#D4B86A"},
  "Lo-Fi":{render:()=><svg width="100%" height="100%" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0}}><defs><radialGradient id="lCity" cx="50%" cy="70%" r="80%"><stop offset="0%" stopColor="#0a1828"/><stop offset="100%" stopColor="#020508"/></radialGradient></defs><rect width="400" height="700" fill="url(#lCity)"/>{[0,45,85,130,175,215,260,300,345,385].map((x,i)=>{const h=150+((i*71)%200),w=38+((i*11)%25);return <rect key={i} x={x} y={700-h} width={w} height={h} fill="rgba(8,12,22,0.95)"/>})}</svg>,bg:"linear-gradient(180deg,#020508 0%,#050c18 40%,#020408 100%)",accent:"#6080CC"},
  Love:{render:()=><svg width="100%" height="100%" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0}}><defs><radialGradient id="loveBg" cx="50%" cy="40%" r="70%"><stop offset="0%" stopColor="#3d0018"/><stop offset="100%" stopColor="#080005"/></radialGradient></defs><rect width="400" height="700" fill="url(#loveBg)"/></svg>,bg:"linear-gradient(180deg,#080003 0%,#150008 50%,#050002 100%)",accent:"#FF3366"},
  Sad:{render:()=><svg width="100%" height="100%" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0}}><defs><radialGradient id="sSky" cx="30%" cy="30%" r="60%"><stop offset="0%" stopColor="#0a1020"/><stop offset="100%" stopColor="#02050a"/></radialGradient></defs><rect width="400" height="700" fill="url(#sSky)"/><circle cx="320" cy="100" r="38" fill="rgba(160,180,220,0.12)"/></svg>,bg:"linear-gradient(180deg,#010306 0%,#050a12 40%,#02040a 100%)",accent:"#4466CC"},
  Gospel:{render:()=><svg width="100%" height="100%" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0}}><defs><radialGradient id="gHall" cx="50%" cy="20%" r="70%"><stop offset="0%" stopColor="#2a1800"/><stop offset="100%" stopColor="#060300"/></radialGradient></defs><rect width="400" height="700" fill="url(#gHall)"/><circle cx="200" cy="120" r="55" fill="rgba(255,180,0,0.08)"/></svg>,bg:"linear-gradient(180deg,#060300 0%,#100800 40%,#040200 100%)",accent:"#FFB800"},
  Amapiano:{render:()=><svg width="100%" height="100%" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0}}><defs><radialGradient id="aBg2" cx="50%" cy="60%" r="80%"><stop offset="0%" stopColor="#1a0800"/><stop offset="100%" stopColor="#040100"/></radialGradient></defs><rect width="400" height="700" fill="url(#aBg2)"/><ellipse cx="200" cy="400" rx="400" ry="80" fill="#FF6600" opacity="0.12"/></svg>,bg:"linear-gradient(180deg,#050100 0%,#120600 40%,#050100 100%)",accent:"#FF7700"},
  Dancehall:{render:()=><svg width="100%" height="100%" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0}}><defs><radialGradient id="dhBg" cx="50%" cy="40%" r="80%"><stop offset="0%" stopColor="#002200"/><stop offset="100%" stopColor="#000a02"/></radialGradient></defs><rect width="400" height="700" fill="url(#dhBg)"/></svg>,bg:"linear-gradient(180deg,#000a02 0%,#001a05 40%,#000502 100%)",accent:"#00CC66"},
  "Hip-Hop":{render:()=><svg width="100%" height="100%" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0}}><defs><radialGradient id="hhSky" cx="50%" cy="25%" r="75%"><stop offset="0%" stopColor="#FF8800"/><stop offset="100%" stopColor="#0a0400"/></radialGradient></defs><rect width="400" height="700" fill="url(#hhSky)"/><circle cx="200" cy="150" r="60" fill="#FFD700" opacity="0.3"/>{[0,40,80,125,170,215,260,300,345,380].map((x,i)=>{const h=130+((i*73)%170);return <rect key={i} x={x} y={420-h} width={36} height={h} fill="rgba(15,8,3,0.9)"/>})}<rect x="0" y="420" width="400" height="280" fill="rgba(10,5,2,0.97)"/></svg>,bg:"linear-gradient(180deg,#150800 0%,#1a0d00 30%,#030100 100%)",accent:"#FFAA33"},
};


const NAMES=["Midnight Drip","Neon Flex","Cloud 9","Dark Mode","Purple Rain","Golden Era","City Lights","Shadow Realm","Electric Feel","Cosmic Wave","Street Dreams","Velvet Thunder","Ice Cold","Fire Nation","Lunar Eclipse","Phantom Flex","Ghost Protocol","Diamond Dust","Black Mirror","Neon Genesis","Crystal Vibes","Deep Waters","Sun Rise","Night Owl","Urban Soul","Savage Mode","Dream State","Time Flies","Cold World","Bliss Point"];
const PRODS=["@NEONWAVE","@TRAPGOD","@LOFI_KING","@SHADOWBEATS","@VIBEMASTER","@BEATSMITH","@PRODIGI","@DARKWAVE","@GOLDCHAIN","@MYSTIK"];
const GENRES=["Drill","Hip-Hop","Trap","Afrobeat","Piano","Love","Sad","Gospel","Amapiano","Lo-Fi","Dancehall"];
const SEMOJI={Drill:"⚡","Hip-Hop":"🎤",Trap:"🔥",Afrobeat:"🌍",Piano:"🎹",Gospel:"✨",Love:"❤️",Sad:"💧","Lo-Fi":"🌙",Amapiano:"🎺",Dancehall:"🇯🇲"};
const GCOL={Drill:{bg:"rgba(255,51,68,0.2)",text:"#FF5566",border:"rgba(255,51,68,0.5)"},Trap:{bg:"rgba(170,68,255,0.2)",text:"#BB77FF",border:"rgba(170,68,255,0.5)"},Afrobeat:{bg:"rgba(255,140,0,0.2)",text:"#FFAA33",border:"rgba(255,140,0,0.5)"},Piano:{bg:"rgba(212,184,106,0.18)",text:"#D4B86A",border:"rgba(212,184,106,0.4)"},Love:{bg:"rgba(255,51,102,0.2)",text:"#FF5577",border:"rgba(255,51,102,0.5)"},Sad:{bg:"rgba(68,102,204,0.2)",text:"#6688EE",border:"rgba(68,102,204,0.5)"},Gospel:{bg:"rgba(255,184,0,0.2)",text:"#FFD700",border:"rgba(255,184,0,0.45)"},Amapiano:{bg:"rgba(255,119,0,0.2)",text:"#FF8833",border:"rgba(255,119,0,0.5)"},"Lo-Fi":{bg:"rgba(96,128,204,0.2)",text:"#7090DD",border:"rgba(96,128,204,0.5)"},Dancehall:{bg:"rgba(0,204,102,0.2)",text:"#00DD77",border:"rgba(0,204,102,0.5)"},"Hip-Hop":{bg:"rgba(255,200,0,0.2)",text:"#FFCC33",border:"rgba(255,200,0,0.5)"}};
const gc=(g)=>GCOL[g]||{bg:"rgba(155,89,255,0.2)",text:"#9B59FF",border:"rgba(155,89,255,0.5)"};
const fmt=(s)=>`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
const fmtN=(n)=>n>=1000000?`${(n/1e6).toFixed(1)}M`:n>=1000?`${(n/1000).toFixed(1)}K`:String(n);
const makeBeat=(i)=>({id:i+1,title:NAMES[i%NAMES.length],producer:PRODS[i%PRODS.length],genre:GENRES[i%GENRES.length],plays:0,likes:0,price:[29,35,42,49,55,65][Math.floor(Math.random()*6)],exclusive:i%5===0,duration:140+Math.floor(Math.random()*90)});
const INIT=Array.from({length:20},(_,i)=>makeBeat(i));

function nextAdThreshold(c){const i=[10,13,17,20,25];return i[c%i.length]+Math.floor(Math.random()*3);}

const MOCK_DEVICES=[];
const MOCK_HISTORY=[];


const CSS=`
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
button,input,textarea,select{font-family:inherit;}
::-webkit-scrollbar{display:none;}
@keyframes waveBar{0%,100%{transform:scaleY(0.3)}50%{transform:scaleY(1)}}
@keyframes heartUp{0%{opacity:1;transform:translate(0,0) scale(0.5)}100%{opacity:0;transform:translate(var(--dx,0px),-60px) scale(1.3)}}
@keyframes toastShow{from{opacity:0;transform:translateX(-50%) translateY(-12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
@keyframes twinkle{0%,100%{opacity:0;transform:scale(0.5)}50%{opacity:1;transform:scale(1)}}
@keyframes bgFade{from{opacity:0}to{opacity:1}}
@keyframes slowZoom{0%{transform:scale(1)}100%{transform:scale(1.05)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:0.6}50%{opacity:1}}
`;


function Toast({msg}){return <div style={{position:"fixed",top:60,left:"50%",zIndex:9999,transform:"translateX(-50%)",background:"rgba(8,6,18,0.97)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:28,padding:"10px 22px",color:"white",fontSize:13,fontWeight:700,pointerEvents:"none",boxShadow:"0 8px 32px rgba(0,0,0,0.6)",animation:"toastShow 0.3s ease",maxWidth:"85vw",textAlign:"center"}}>{msg}</div>;}

function SceneWrapper({beat}){
  const scene=SCENES[beat.genre];
  return(<div style={{position:"absolute",inset:0,overflow:"hidden",animation:"bgFade 0.7s ease"}}><div style={{position:"absolute",inset:0,background:scene?.bg||"#050208",animation:"slowZoom 28s ease-in-out infinite alternate"}}>{scene?.render()}</div><div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%,transparent 30%,rgba(0,0,0,0.55) 100%)",zIndex:3,pointerEvents:"none"}}/><div style={{position:"absolute",bottom:0,left:0,right:0,height:"55%",background:"linear-gradient(to bottom,transparent,rgba(0,0,0,0.7) 50%,rgba(0,0,0,0.97))",zIndex:4,pointerEvents:"none"}}/><div style={{position:"absolute",top:0,left:0,right:0,height:"25%",background:"linear-gradient(to bottom,rgba(0,0,0,0.5),transparent)",zIndex:4,pointerEvents:"none"}}/></div>);
}

function Viz({playing,accent}){
  const N=42;const[bars,setBars]=useState(()=>Array(N).fill(3));const tk=useRef(0);
  useEffect(()=>{if(!playing){setBars(Array(N).fill(3));return;}const iv=setInterval(()=>{tk.current++;const intens=0.4+0.6*Math.abs(Math.sin(tk.current*0.04));setBars(Array.from({length:N},(_,i)=>Math.max(3,Math.min(40,3+intens*Math.abs(Math.sin(tk.current*0.18+i*0.43))*(0.6+Math.random()*0.4)*38))));},90);return()=>clearInterval(iv);},[playing]);
  return <div style={{display:"flex",alignItems:"flex-end",gap:1.5,height:40,filter:`drop-shadow(0 0 5px ${accent}88)`}}>{bars.map((v,i)=><div key={i} style={{flex:1,minWidth:1.5,borderRadius:2,height:`${v}px`,background:`linear-gradient(to top,${accent},${accent}66)`,transition:"height 0.09s ease"}}/>)}</div>;
}

function SideBtn({children,count,onClick,active,accent,burst}){
  return <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative"}}><button onClick={onClick} style={{width:40,height:40,borderRadius:"50%",background:active?`${accent}22`:"rgba(255,255,255,0.08)",border:`1.5px solid ${active?accent+"88":"rgba(255,255,255,0.15)"}`,boxShadow:active?`0 0 18px ${accent}66`:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.25s"}}>{children}</button>{count!==undefined&&<span style={{color:"rgba(255,255,255,0.8)",fontSize:10,fontWeight:700}}>{fmtN(count)}</span>}{burst>0&&Array.from({length:5}).map((_,i)=><span key={burst+"-"+i} style={{position:"absolute",top:8,left:"50%",fontSize:10,color:"#FF5C8A",pointerEvents:"none","--dx":`${(i-2)*12}px`,animation:`heartUp 0.85s ease-out ${i*0.05}s forwards`}}>❤</span>)}</div>;
}


function AdModal({reason,onDone,ct,T}){
  const DUR=6;const[n,setN]=useState(DUR);const[done,setDone]=useState(false);
  useEffect(()=>{const iv=setInterval(()=>setN(c=>{if(c<=1){clearInterval(iv);setDone(true);return 0;}return c-1;}),1000);return()=>clearInterval(iv);},[]);
  const circ=2*Math.PI*20;
  return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(14px)",zIndex:2500,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}><div style={{background:"#0A0718",border:"1px solid rgba(255,255,255,0.08)",borderRadius:24,padding:28,width:"100%",maxWidth:340,textAlign:"center",animation:"slideUp 0.3s ease"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><span style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontWeight:700,letterSpacing:1}}>{T.adLabel}</span><div style={{position:"relative",width:44,height:44}}><svg width="44" height="44" style={{position:"absolute",inset:0,transform:"rotate(-90deg)"}}><circle cx="22" cy="22" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3"/>{!done&&<circle cx="22" cy="22" r="20" fill="none" stroke={ct.accent} strokeWidth="3" strokeDasharray={circ} strokeDashoffset={circ*(1-n/DUR)} strokeLinecap="round" style={{transition:"stroke-dashoffset 1s linear"}}/>}</svg><span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:13,fontWeight:800}}>{done?"✓":n}</span></div></div><div style={{height:130,background:"linear-gradient(135deg,#1a0c3a,#0a1428)",borderRadius:16,marginBottom:18,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8}}><div style={{fontSize:36}}>🎵</div><p style={{color:"rgba(255,255,255,0.3)",fontSize:12,margin:0,fontWeight:600}}>BeatMarket Premium</p></div>{done?<button onClick={onDone} style={{width:"100%",padding:"13px",borderRadius:28,background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:"white",fontWeight:800,fontSize:15,cursor:"pointer"}}>{reason==="download"?T.downloadNow:"Continuer →"}</button>:<button disabled style={{width:"100%",padding:"13px",borderRadius:28,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.3)",fontWeight:800,fontSize:14,cursor:"not-allowed"}}>{T.waitSec} {n}s…</button>}</div></div>);
}


function SignupModal({onComplete,onClose,ct,T,reason}){
  const[mode,setMode]=useState("choice"); // choice | google | email | country
  const[step,setStep]=useState(1);
  const[form,setForm]=useState({name:"",email:"",password:""});
  const[country,setCountry]=useState(null);
  const[countryQuery,setCountryQuery]=useState("");
  const[googleLoading,setGoogleLoading]=useState(false);
  const[isLogin,setIsLogin]=useState(false);

  const filteredCountries=useMemo(()=>{if(!countryQuery.trim())return COUNTRIES;const q=countryQuery.toLowerCase();return COUNTRIES.filter(c=>c.name.toLowerCase().includes(q));},[countryQuery]);

  const inp={width:"100%",padding:"13px 15px",borderRadius:14,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"white",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:12};

  const startGoogle=()=>{setGoogleLoading(true);setTimeout(()=>{setGoogleLoading(false);setMode("email");},1600);};

  const submitEmail=()=>{if(!form.name.trim()||!form.email.trim()||!form.password.trim())return;setMode("country");};

  const finish=()=>{if(!country)return;onComplete({...form,country,provider:mode==="google"||form.email==="jonathan.dupont@gmail.com"?"google":"email"});};

  return(<div style={{position:"fixed",inset:0,zIndex:4000,background:"rgba(2,1,6,0.97)",backdropFilter:"blur(20px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.25s ease",overflowY:"auto"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"50px 18px 6px"}}>
      {mode!=="choice"?<button onClick={()=>{setMode("choice");setGoogleLoading(false);}} style={{background:"rgba(255,255,255,0.07)",border:"none",color:"white",width:36,height:36,borderRadius:"50%",fontSize:18,cursor:"pointer"}}>‹</button>:<div style={{width:36}}/>}
      {onClose&&<button onClick={onClose} style={{background:"rgba(255,255,255,0.07)",border:"none",color:"rgba(255,255,255,0.6)",width:36,height:36,borderRadius:"50%",fontSize:16,cursor:"pointer"}}>×</button>}
    </div>

    <div style={{flex:1,display:"flex",flexDirection:"column",padding:"10px 24px 40px",maxWidth:420,width:"100%",margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{width:62,height:62,borderRadius:18,background:`linear-gradient(135deg,${ct.accent},${ct.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",boxShadow:`0 0 26px ${ct.glow}`}}><svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M9 18V5l12-2v13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="6" cy="18" r="3" fill="white"/><circle cx="18" cy="16" r="3" fill="white"/></svg></div>
        <h1 style={{color:"white",fontSize:21,fontWeight:900,margin:"0 0 7px"}}>{mode==="country"?T.selectCountry:T.signupTitle}</h1>
        <p style={{color:"rgba(255,255,255,0.4)",fontSize:13,margin:0,lineHeight:1.5}}>{mode==="country"?"Dernière étape avant de continuer.":(reason&&T["signupRequired"+reason.charAt(0).toUpperCase()+reason.slice(1)])||T.signupSubtitle}</p>
      </div>

      {mode==="choice"&&<>
        <button onClick={startGoogle} disabled={googleLoading} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:11,padding:"14px",borderRadius:16,background:"white",border:"none",cursor:googleLoading?"default":"pointer",marginBottom:12,opacity:googleLoading?0.75:1}}>
          {googleLoading?<><div style={{width:18,height:18,borderRadius:"50%",border:"2.5px solid rgba(0,0,0,0.15)",borderTopColor:"#4285F4",animation:"pulse 0.8s linear infinite"}}/><span style={{color:"#3c4043",fontSize:14,fontWeight:700}}>{T.googleConnecting}</span></>:<><svg width="19" height="19" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg><span style={{color:"#3c4043",fontSize:14,fontWeight:700}}>{T.continueWithGoogle}</span></>}
        </button>
        <div style={{display:"flex",alignItems:"center",gap:10,margin:"6px 0 16px"}}><div style={{flex:1,height:1,background:"rgba(255,255,255,0.1)"}}/><span style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontWeight:600}}>{T.or}</span><div style={{flex:1,height:1,background:"rgba(255,255,255,0.1)"}}/></div>
        <button onClick={()=>setMode("email")} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:11,padding:"14px",borderRadius:16,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",cursor:"pointer",marginBottom:22}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-9.97 6.5a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <span style={{color:"white",fontSize:14,fontWeight:700}}>{T.continueWithEmail}</span>
        </button>
        <p style={{textAlign:"center",color:"rgba(255,255,255,0.3)",fontSize:12.5}}>{isLogin?"Pas encore de compte ? ":T.alreadyHaveAccount+" "}<button onClick={()=>setIsLogin(l=>!l)} style={{background:"none",border:"none",color:ct.accent2,fontSize:12.5,fontWeight:700,cursor:"pointer",padding:0}}>{isLogin?T.backToSignup:T.logIn}</button></p>
        <p style={{textAlign:"center",color:"rgba(255,255,255,0.18)",fontSize:10.5,marginTop:20,lineHeight:1.6}}>{T.bySigningUp} <span style={{textDecoration:"underline"}}>{T.termsOfUse}</span> {T.andOur} <span style={{textDecoration:"underline"}}>{T.privacyPolicy}</span>.</p>
      </>}

      {mode==="email"&&<>
        <label style={{color:"rgba(255,255,255,0.35)",fontSize:10.5,fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>{T.fullName}</label>
        <input style={inp} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Jonathan Dupont" autoFocus/>
        <label style={{color:"rgba(255,255,255,0.35)",fontSize:10.5,fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>{T.emailAddress}</label>
        <input type="email" style={inp} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="toi@email.com"/>
        <label style={{color:"rgba(255,255,255,0.35)",fontSize:10.5,fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>{T.createPassword}</label>
        <input type="password" style={inp} value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} placeholder="••••••••"/>
        <button onClick={submitEmail} disabled={!form.name.trim()||!form.email.trim()||!form.password.trim()} style={{width:"100%",padding:"14px",borderRadius:28,background:(!form.name.trim()||!form.email.trim()||!form.password.trim())?"rgba(255,255,255,0.08)":`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:(!form.name.trim()||!form.email.trim()||!form.password.trim())?"rgba(255,255,255,0.3)":"white",fontWeight:800,fontSize:14,cursor:(!form.name.trim()||!form.email.trim()||!form.password.trim())?"default":"pointer",marginTop:6,boxShadow:(!form.name.trim()||!form.email.trim()||!form.password.trim())?"none":`0 6px 24px ${ct.glow}`}}>{T.continueBtn}</button>
      </>}

      {mode==="country"&&<>
        <div style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:14,padding:"11px 14px",marginBottom:14}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={countryQuery} onChange={e=>setCountryQuery(e.target.value)} placeholder={T.searchCountry} style={{flex:1,background:"none",border:"none",color:"white",fontSize:14,outline:"none"}}/>
        </div>
        <div style={{maxHeight:280,overflowY:"auto",marginBottom:16,borderRadius:14,border:"1px solid rgba(255,255,255,0.06)"}}>
          {filteredCountries.map(c=><button key={c.code} onClick={()=>setCountry(c)} style={{width:"100%",display:"flex",alignItems:"center",gap:13,padding:"12px 14px",background:country?.code===c.code?`${ct.accent}18`:"transparent",border:"none",borderBottom:"1px solid rgba(255,255,255,0.04)",cursor:"pointer",textAlign:"left"}}>
            <span style={{fontSize:22}}>{c.flag}</span><span style={{color:country?.code===c.code?"white":"rgba(255,255,255,0.7)",fontSize:14,fontWeight:country?.code===c.code?800:400,flex:1}}>{c.name}</span>{country?.code===c.code&&<span style={{color:ct.accent,fontSize:16}}>✓</span>}
          </button>)}
          {filteredCountries.length===0&&<p style={{color:"rgba(255,255,255,0.3)",fontSize:13,textAlign:"center",padding:20}}>{T.noResults}</p>}
        </div>
        <button onClick={finish} disabled={!country} style={{width:"100%",padding:"14px",borderRadius:28,background:!country?"rgba(255,255,255,0.08)":`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:!country?"rgba(255,255,255,0.3)":"white",fontWeight:800,fontSize:14,cursor:!country?"default":"pointer",boxShadow:!country?"none":`0 6px 24px ${ct.glow}`}}>{T.createAccount}</button>
      </>}
    </div>
  </div>);
}


function DownloadModal({beat,premium,onWatchAd,onClose,ct,T}){
  const g=gc(beat.genre);
  return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",backdropFilter:"blur(12px)",zIndex:2400,display:"flex",alignItems:"flex-end"}} onClick={onClose}><div style={{width:"100%",background:"#0A0718",borderRadius:"22px 22px 0 0",border:"1px solid rgba(255,255,255,0.07)",padding:"22px 20px 44px",animation:"slideUp 0.3s ease"}} onClick={e=>e.stopPropagation()}><div style={{width:36,height:4,borderRadius:2,background:"rgba(255,255,255,0.16)",margin:"0 auto 18px"}}/><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><div style={{width:52,height:52,borderRadius:14,background:SCENES[beat.genre]?.bg?.split(",")[0]||"#050208",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{SEMOJI[beat.genre]||"🎵"}</div><div><h3 style={{color:"white",fontSize:16,fontWeight:900,margin:"0 0 4px"}}>{beat.title}</h3><div style={{display:"flex",gap:6}}><span style={{background:g.bg,color:g.text,fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:8,border:`1px solid ${g.border}`}}>{beat.genre}</span><span style={{color:"rgba(255,255,255,0.35)",fontSize:12}}>{beat.producer}</span></div></div></div>
  {premium?(<><div style={{background:"linear-gradient(130deg,rgba(255,184,0,0.12),rgba(255,229,102,0.06))",border:"1px solid rgba(255,184,0,0.25)",borderRadius:16,padding:"14px 16px",marginBottom:16}}><p style={{color:"#FFD700",fontSize:13,fontWeight:800,margin:"0 0 4px"}}>👑 {T.premium} · {T.fastDownload}</p><p style={{color:"rgba(255,255,255,0.45)",fontSize:12,margin:0}}>{T.maxQuality} · {T.commercialLicense}</p></div><button onClick={onWatchAd} style={{width:"100%",padding:"14px",borderRadius:28,background:"linear-gradient(90deg,#FFB800,#FFE566)",border:"none",color:"#3a2a00",fontWeight:900,fontSize:15,cursor:"pointer",boxShadow:"0 6px 28px rgba(255,184,0,0.4)"}}>⬇️ {T.download} ({T.premium})</button></>):(<><div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"14px 16px",marginBottom:14}}><p style={{color:"white",fontSize:13,fontWeight:800,margin:"0 0 6px"}}>📋 Licence gratuite</p><div style={{display:"flex",flexDirection:"column",gap:5}}>{["✅ Écoute personnelle","✅ Entraînement","✅ Projets perso"].map((t,i)=><span key={i} style={{color:"rgba(255,255,255,0.55)",fontSize:12}}>{t}</span>)}{["❌ Monétisation","❌ Usage commercial"].map((t,i)=><span key={i} style={{color:"rgba(255,80,80,0.7)",fontSize:12}}>{t}</span>)}</div></div><button onClick={onWatchAd} style={{width:"100%",padding:"14px",borderRadius:28,background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:"white",fontWeight:900,fontSize:15,cursor:"pointer",boxShadow:`0 6px 28px ${ct.glow}`,marginBottom:10}}>📺 {T.watchAd}</button></>)}</div></div>);
}


function PremiumModal({onConfirm,onClose,ct,T}){
  return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(12px)",zIndex:2600,display:"flex",alignItems:"center",justifyContent:"center",padding:24}} onClick={onClose}><div style={{background:"#0A0718",border:"1px solid rgba(255,184,0,0.25)",borderRadius:24,padding:28,width:"100%",maxWidth:360,textAlign:"center",animation:"slideUp 0.3s ease"}} onClick={e=>e.stopPropagation()}><div style={{fontSize:46,marginBottom:10}}>👑</div><h3 style={{color:"white",fontSize:20,fontWeight:900,margin:"0 0 4px"}}>{T.premiumTitle}</h3><p style={{color:"rgba(255,255,255,0.35)",fontSize:13,margin:"0 0 20px"}}>{T.premiumSubtitle}</p><div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:22,textAlign:"left"}}>{[["🚫",T.noAds],["⬇️",T.fastDownload],["🎧",T.maxQuality],["💎",T.exclusiveAccess],["✅",T.commercialLicense],["📱","YouTube · TikTok · Monétisation"]].map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,184,0,0.06)",border:"1px solid rgba(255,184,0,0.15)",borderRadius:12,padding:"10px 13px"}}><span style={{fontSize:17}}>{r[0]}</span><span style={{color:"rgba(255,255,255,0.85)",fontSize:13,fontWeight:600}}>{r[1]}</span></div>)}</div><button onClick={onConfirm} style={{width:"100%",padding:"14px",borderRadius:28,background:"linear-gradient(90deg,#FFB800,#FFE566)",border:"none",color:"#3a2a00",fontWeight:900,fontSize:15,cursor:"pointer",boxShadow:"0 8px 28px rgba(255,184,0,0.4)",marginBottom:10}}>{T.activatePremium} · 8€</button><button onClick={onClose} style={{width:"100%",padding:"10px",background:"none",border:"none",color:"rgba(255,255,255,0.28)",fontSize:13,cursor:"pointer"}}>{T.continueAsFree}</button></div></div>);
}


function CommentsModal({beat,comments,onAdd,onClose,ct,T}){
  const[txt,setTxt]=useState("");const sub=()=>{const v=txt.trim();if(!v)return;onAdd(v);setTxt("");};
  return(<div style={{position:"fixed",inset:0,zIndex:1500,background:"rgba(0,0,0,0.65)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-end"}} onClick={onClose}><div style={{width:"100%",maxHeight:"72vh",background:"#0A0718",borderRadius:"22px 22px 0 0",border:"1px solid rgba(255,255,255,0.07)",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}><div style={{padding:"12px 18px 14px",borderBottom:"1px solid rgba(255,255,255,0.06)",textAlign:"center"}}><div style={{width:36,height:4,borderRadius:2,background:"rgba(255,255,255,0.18)",margin:"0 auto 11px"}}/><span style={{color:"white",fontWeight:800,fontSize:15}}>{comments.length} {T.comments}</span></div><div style={{flex:1,overflowY:"auto",padding:"4px 18px"}}>{comments.length===0?<div style={{textAlign:"center",padding:"36px 0"}}><div style={{fontSize:32,marginBottom:8}}>💬</div><p style={{color:"rgba(255,255,255,0.35)",fontSize:13,margin:0}}>{T.addFirstComment}</p></div>:comments.map(c=><div key={c.id} style={{display:"flex",gap:10,padding:"11px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}><div style={{width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${ct.accent},${ct.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:900,fontSize:13,flexShrink:0}}>{c.user[1]?.toUpperCase()}</div><div style={{flex:1}}><span style={{color:"white",fontWeight:700,fontSize:13}}>{c.user}</span><p style={{color:"rgba(255,255,255,0.7)",fontSize:13,margin:"3px 0 0"}}>{c.text}</p></div></div>)}</div><div style={{display:"flex",gap:10,padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.06)"}}><input value={txt} onChange={e=>setTxt(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sub()} placeholder={T.addComment} style={{flex:1,padding:"11px 15px",borderRadius:22,border:"1px solid rgba(255,255,255,0.09)",background:"rgba(255,255,255,0.05)",color:"white",fontSize:13,outline:"none"}}/><button onClick={sub} style={{width:42,height:42,borderRadius:"50%",background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg></button></div></div></div>);
}


function SearchOverlay({beats,history,onSelect,onClose,onAddHistory,ct,T}){
  const[q,setQ]=useState("");const[focused,setFocused]=useState(false);const inp=useRef(null);
  useEffect(()=>{setTimeout(()=>inp.current?.focus(),80);},[]);
  const results=useMemo(()=>{if(!q.trim())return[];const lq=q.toLowerCase();return beats.filter(b=>b.title.toLowerCase().includes(lq)||b.producer.toLowerCase().includes(lq)||b.genre.toLowerCase().includes(lq)||fmtN(b.plays).includes(lq));},[q,beats]);
  const pick=(beat,idx)=>{onAddHistory(beat);onSelect(idx);onClose();};
  return(<div style={{position:"fixed",inset:0,zIndex:500,background:"rgba(3,1,8,0.98)",backdropFilter:"blur(18px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.2s ease"}}><div style={{display:"flex",alignItems:"center",gap:10,padding:"52px 14px 10px"}}><div style={{flex:1,display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.07)",border:`1.5px solid ${focused?ct.accent+"66":"rgba(255,255,255,0.1)"}`,borderRadius:16,padding:"10px 14px",transition:"border-color 0.2s"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input ref={inp} value={q} onChange={e=>setQ(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} placeholder={T.searchPlaceholder} style={{flex:1,background:"none",border:"none",color:"white",fontSize:15,outline:"none",caretColor:ct.accent}}/>{q.length>0&&<button onClick={()=>setQ("")} style={{background:"rgba(255,255,255,0.12)",border:"none",color:"rgba(255,255,255,0.5)",width:20,height:20,borderRadius:"50%",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>}</div><button onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,0.55)",fontSize:14,fontWeight:700,cursor:"pointer",padding:"6px 2px"}}>{T.cancel}</button></div><div style={{flex:1,overflowY:"auto",padding:"0 14px 24px"}}>{q.trim().length===0?(<>{history.length>0&&<><p style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"14px 0 10px"}}>{T.recentlyListened}</p>{history.map((b,i)=><div key={b.id+i} onClick={()=>pick(b,beats.findIndex(x=>x.id===b.id))} style={{display:"flex",alignItems:"center",gap:11,padding:"9px 10px",borderRadius:14,cursor:"pointer",marginBottom:5,background:"rgba(255,255,255,0.03)"}}><div style={{width:44,height:44,borderRadius:11,background:SCENES[b.genre]?.bg?.split(",")[0]||"#050208",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{SEMOJI[b.genre]||"🎵"}</div><div style={{flex:1,minWidth:0}}><p style={{color:"white",fontSize:13,fontWeight:700,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.title}</p><p style={{color:"rgba(255,255,255,0.35)",fontSize:11,margin:"2px 0 0"}}>{b.producer} · <span style={{color:gc(b.genre).text,fontSize:10}}>{b.genre}</span></p></div></div>)}</>}<p style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"18px 0 10px"}}>{T.byGenre}</p><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{GENRES.map(genre=>{const g=gc(genre);return <button key={genre} onClick={()=>setQ(genre)} style={{padding:"8px 14px",borderRadius:20,background:g.bg,border:`1.5px solid ${g.border}`,color:g.text,fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>{SEMOJI[genre]||"🎵"} {genre}</button>;})}</div></>):results.length===0?<div style={{textAlign:"center",padding:"52px 20px"}}><div style={{fontSize:40,marginBottom:10}}>🔍</div><p style={{color:"rgba(255,255,255,0.3)",fontSize:14,margin:0}}>{T.noResults} <span style={{color:"white",fontWeight:700}}>"{q}"</span></p></div>:<>{results.map(b=>{const idx=beats.findIndex(x=>x.id===b.id);const g=gc(b.genre);return <div key={b.id} onClick={()=>pick(b,idx)} style={{display:"flex",alignItems:"center",gap:11,padding:"9px 10px",borderRadius:14,cursor:"pointer",marginBottom:5,background:"rgba(255,255,255,0.03)"}}><div style={{width:50,height:50,borderRadius:12,background:SCENES[b.genre]?.bg?.split(",")[0]||"#050208",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{SEMOJI[b.genre]||"🎵"}</div><div style={{flex:1,minWidth:0}}><p style={{color:"white",fontSize:14,fontWeight:700,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.title}</p><div style={{display:"flex",gap:6,alignItems:"center",marginTop:3}}><span style={{color:"rgba(255,255,255,0.35)",fontSize:11}}>{b.producer}</span><span style={{background:g.bg,color:g.text,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:6,border:`1px solid ${g.border}`}}>{b.genre}</span><span style={{color:"rgba(255,255,255,0.25)",fontSize:10}}>{fmtN(b.plays)} {T.plays}</span></div></div></div>;})} </>}</div></div>);
}


function SeekBar({elapsed,duration,accent,onSeek,fmt}){
  const barRef=useRef(null);
  const seeking=useRef(false);

  const calcSeek=(clientX)=>{
    const bar=barRef.current;
    if(!bar||!duration)return;
    const rect=bar.getBoundingClientRect();
    const ratio=Math.max(0,Math.min(1,(clientX-rect.left)/rect.width));
    onSeek(Math.round(ratio*duration));
  };

  const onMouseDown=(e)=>{seeking.current=true;calcSeek(e.clientX);};
  const onMouseMove=(e)=>{if(seeking.current)calcSeek(e.clientX);};
  const onMouseUp=()=>{seeking.current=false;};

  const onTouchStart=(e)=>{seeking.current=true;calcSeek(e.touches[0].clientX);e.stopPropagation();};
  const onTouchMove=(e)=>{if(seeking.current){calcSeek(e.touches[0].clientX);e.stopPropagation();}};
  const onTouchEnd=(e)=>{seeking.current=false;e.stopPropagation();};

  const pct=duration>0?(elapsed/duration)*100:0;
  const thumbLeft=`calc(${pct}% - 7px)`;

  return(
    <div style={{display:"flex",alignItems:"center",gap:9}}>
      <span style={{color:"rgba(255,255,255,0.38)",fontSize:10,minWidth:26}}>{fmt(elapsed)}</span>
      <div
        ref={barRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{flex:1,height:20,display:"flex",alignItems:"center",cursor:"pointer",position:"relative"}}
      >
        {/* Track */}
        <div style={{position:"absolute",left:0,right:0,height:4,background:"rgba(255,255,255,0.12)",borderRadius:4}}>
          {/* Rempli */}
          <div style={{height:"100%",borderRadius:4,width:`${pct}%`,background:`linear-gradient(90deg,${accent},${accent}99)`,boxShadow:`0 0 10px ${accent}88`}}/>
        </div>
        {/* Thumb */}
        <div style={{position:"absolute",top:"50%",left:thumbLeft,transform:"translateY(-50%)",width:14,height:14,borderRadius:"50%",background:"white",boxShadow:`0 0 8px ${accent}`,pointerEvents:"none"}}/>
      </div>
      <span style={{color:"rgba(255,255,255,0.38)",fontSize:10,minWidth:26,textAlign:"right"}}>{fmt(duration)}</span>
    </div>
  );
}

function BeatCard({beat,nextBeat,isActive,onToast,favs,onFav,commentCount,onComment,onDownload,ct,playing,setPlaying,elapsed,setElapsed,T,reduceAnim,account,onRequireAuth,onTokens}){
  const[liked,setLiked]=useState(false);const[likes,setLikes]=useState(beat.likes);const[saves,setSaves]=useState(0);const[shares,setShares]=useState(0);const[burst,setBurst]=useState(0);
  const isFav=favs.some(f=>f.id===beat.id);const scene=SCENES[beat.genre];const sceneAccent=scene?.accent||ct.accent;const g=gc(beat.genre);const iv=useRef(null);
  const audioRef=useRef(null);

  useEffect(()=>{
    if(isActive){
      setElapsed(0);
      if(beat.audioUrl){
        if(audioRef.current){audioRef.current.pause();audioRef.current.src="";}
        const a=new Audio(beat.audioUrl);
        a.ontimeupdate=()=>setElapsed(Math.floor(a.currentTime));
        a.onended=()=>{setPlaying(false);setElapsed(0);};
        audioRef.current=a;
        a.play().catch(()=>{});
        setPlaying(true);
      } else {
        setPlaying(true);
      }
    } else {
      if(audioRef.current){audioRef.current.pause();audioRef.current.src="";}
      setPlaying(false);
    }
    return()=>{if(audioRef.current){audioRef.current.pause();audioRef.current.src="";}};
  },[isActive,beat.id]);

  useEffect(()=>{
    if(!beat.audioUrl){
      if(playing){iv.current=setInterval(()=>setElapsed(e=>{if(e>=beat.duration){clearInterval(iv.current);setPlaying(false);return 0;}return e+1;}),1000);}
      else clearInterval(iv.current);
      return()=>clearInterval(iv.current);
    } else {
      if(audioRef.current){
        if(playing){audioRef.current.play().catch(()=>{});}
        else audioRef.current.pause();
      }
    }
  },[playing]);
  const doLike=()=>{if(!account){onRequireAuth("like");return;}if(!liked){setBurst(b=>b+1);onTokens?.(1);}setLiked(x=>!x);setLikes(l=>liked?l-1:l+1);};
  const doFav=()=>{if(!account){onRequireAuth("fav");return;}onFav(beat);setSaves(c=>isFav?Math.max(0,c-1):c+1);onToast(isFav?T.removedFromFavs:T.savedToFavs);};
  const doShare=()=>{if(!account){onRequireAuth("fav");return;}setShares(c=>c+1);onTokens?.(2);onToast(T.linkCopied);};
  const doComment=()=>{if(!account){onRequireAuth("comment");return;}onComment(beat);};
  return(<div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:"#030108"}}><SceneWrapper beat={beat}/>{playing&&!reduceAnim&&<div style={{position:"absolute",top:54,left:"50%",transform:"translateX(-50%)",background:"rgba(0,0,0,0.65)",backdropFilter:"blur(12px)",border:`1px solid ${sceneAccent}44`,borderRadius:24,padding:"6px 18px",display:"flex",alignItems:"center",gap:8,zIndex:10,whiteSpace:"nowrap"}}><div style={{display:"flex",gap:2.5,alignItems:"flex-end"}}>{[0,1,2,3,4].map(k=><div key={k} style={{width:2.5,borderRadius:2,background:sceneAccent,animation:`waveBar 0.6s ease-in-out ${k*0.1}s infinite`,height:"14px",transformOrigin:"bottom"}}/>)}</div><span style={{color:"white",fontSize:10,fontWeight:800,letterSpacing:2.5}}>{T.playing}</span></div>}{!playing&&<button onClick={()=>setPlaying(true)} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:10,width:72,height:72,borderRadius:"50%",background:"rgba(0,0,0,0.55)",backdropFilter:"blur(12px)",border:`2px solid ${sceneAccent}88`,boxShadow:`0 0 30px ${sceneAccent}55`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="28" height="28" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg></button>}{playing&&<button onClick={()=>setPlaying(false)} style={{position:"absolute",top:"20%",left:"10%",right:"15%",bottom:"35%",zIndex:9,background:"transparent",border:"none",cursor:"pointer"}}/>}{isActive&&nextBeat&&<div style={{position:"absolute",top:14,right:14,zIndex:20,display:"flex",alignItems:"center",gap:7,background:"rgba(6,4,16,0.5)",backdropFilter:"blur(14px)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"5px 10px 5px 6px",maxWidth:140}}><div style={{width:28,height:28,borderRadius:8,background:SCENES[nextBeat.genre]?.bg?.split(",")[0]||"#050208",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{SEMOJI[nextBeat.genre]||"🎵"}</div><div style={{overflow:"hidden"}}><p style={{color:"rgba(255,255,255,0.3)",fontSize:8,fontWeight:800,letterSpacing:1.5,margin:0,textTransform:"uppercase"}}>{T.next}</p><p style={{color:"white",fontSize:11,fontWeight:700,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{nextBeat.title}</p></div></div>}<div style={{position:"absolute",right:14,top:0,bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:13,zIndex:15}}><SideBtn onClick={doLike} count={likes} active={liked} accent={liked?"#FF5C8A":sceneAccent} burst={burst}><svg width="18" height="18" viewBox="0 0 24 24" fill={liked?"#FF5C8A":"none"} stroke={liked?"#FF5C8A":"white"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></SideBtn><SideBtn onClick={doComment} count={commentCount} accent={sceneAccent}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></svg></SideBtn><SideBtn onClick={doFav} count={saves} active={isFav} accent={sceneAccent}><svg width="18" height="18" viewBox="0 0 24 24" fill={isFav?sceneAccent:"none"} stroke={isFav?sceneAccent:"white"} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></SideBtn><SideBtn onClick={doShare} count={shares} accent={sceneAccent}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></SideBtn><SideBtn onClick={()=>onDownload(beat)} accent={sceneAccent}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></SideBtn></div><div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 16px 18px",zIndex:15}}><div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}><span style={{padding:"5px 12px",borderRadius:18,fontSize:10,fontWeight:800,background:g.bg,color:g.text,border:`1.5px solid ${g.border}`}}>{SEMOJI[beat.genre]||"🎵"} {beat.genre}</span>{beat.exclusive&&<span style={{padding:"5px 12px",borderRadius:18,fontSize:10,fontWeight:700,background:"rgba(255,184,0,0.15)",color:"#FFD700",border:"1.5px solid rgba(255,184,0,0.4)"}}>{T.exclusive}</span>}<span style={{padding:"5px 12px",borderRadius:18,fontSize:10,fontWeight:700,background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.6)",border:"1.5px solid rgba(255,255,255,0.1)"}}>{fmt(beat.duration)}</span></div><h2 style={{color:"white",fontSize:26,fontWeight:900,margin:"0 0 3px",lineHeight:1.1,textShadow:"0 2px 16px rgba(0,0,0,0.8)",letterSpacing:-0.4}}>{beat.title}</h2><p style={{color:"rgba(255,255,255,0.5)",fontSize:13,margin:"0 0 12px"}}>{beat.producer} · {fmtN(beat.plays)} {T.plays}</p><div style={{marginBottom:9}}><Viz playing={playing} accent={sceneAccent}/></div><SeekBar elapsed={elapsed} duration={beat.duration} accent={sceneAccent} onSeek={setElapsed} fmt={fmt}/></div></div>);
}

function MiniPlayer({beat,playing,setPlaying,elapsed,onBack,ct,T}){
  const scene=SCENES[beat.genre];const accent=scene?.accent||ct.accent;
  return(<div style={{position:"sticky",top:0,zIndex:90,display:"flex",alignItems:"center",gap:10,background:"rgba(8,5,18,0.95)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${accent}33`,padding:"10px 14px",boxShadow:"0 4px 18px rgba(0,0,0,0.35)"}}><button onClick={onBack} style={{width:38,height:38,borderRadius:10,background:"rgba(255,255,255,0.06)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",flexShrink:0}}>{SEMOJI[beat.genre]||"🎵"}</button><div onClick={onBack} style={{flex:1,minWidth:0,cursor:"pointer"}}><p style={{color:"white",fontSize:13,fontWeight:800,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{beat.title}</p><p style={{color:"rgba(255,255,255,0.35)",fontSize:10.5,margin:"2px 0 5px"}}>{playing?T.playing:T.pause} · {beat.producer}</p><div style={{height:2.5,background:"rgba(255,255,255,0.12)",borderRadius:2}}><div style={{height:"100%",borderRadius:2,width:`${(elapsed/beat.duration)*100}%`,background:accent,transition:"width 0.95s linear"}}/></div></div><button onClick={e=>{e.stopPropagation();setPlaying(p=>!p);}} style={{width:38,height:38,borderRadius:"50%",background:`${accent}22`,border:`1.5px solid ${accent}77`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>{playing?<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>:<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>}</button></div>);
}


function Splash({onDone,T}){
  const[pct,setPct]=useState(0);const[show,setShow]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setShow(true),200);return()=>clearTimeout(t);},[]);
  useEffect(()=>{if(!show)return;const iv=setInterval(()=>setPct(p=>{const n=p+2+Math.random();if(n>=100){clearInterval(iv);setTimeout(onDone,400);return 100;}return n;}),70);return()=>clearInterval(iv);},[show]);
  return(<div style={{position:"fixed",inset:0,background:"radial-gradient(ellipse at 50% 30%,rgba(155,89,255,0.2),transparent 65%),linear-gradient(175deg,#04020E,#0C0620 50%,#040510)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"inherit",zIndex:9999,overflow:"hidden"}}>{Array.from({length:22}).map((_,i)=><div key={i} style={{position:"absolute",left:`${(i*17+7)%96}%`,top:`${(i*13+5)%90}%`,width:(i%3)+1,height:(i%3)+1,borderRadius:"50%",background:"white",animation:`twinkle ${2+i%3}s ease-in-out ${i*0.3}s infinite`,pointerEvents:"none"}}/>)}<div style={{display:"flex",flexDirection:"column",alignItems:"center",opacity:show?1:0,transition:"all 0.7s cubic-bezier(0.22,1,0.36,1)"}}><div style={{width:110,height:110,borderRadius:28,background:"linear-gradient(145deg,#160E3A,#06030F)",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 0 70px rgba(155,89,255,0.5)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:26}}><svg width="66" height="66" viewBox="0 0 72 72" fill="none"><path d="M36 12C23.85 12 14 21.85 14 34V50" stroke="url(#sg2)" strokeWidth="5" strokeLinecap="round"/><path d="M36 12C48.15 12 58 21.85 58 34V50" stroke="url(#sg2)" strokeWidth="5" strokeLinecap="round"/><rect x="9" y="44" width="12" height="18" rx="6" fill="url(#sg2)"/><rect x="51" y="44" width="12" height="18" rx="6" fill="url(#sg2)"/><text x="29" y="58" fontSize="15" fill="white" opacity="0.9">♪</text><defs><linearGradient id="sg2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset="0.5" stopColor="#9B89FF"/><stop offset="1" stopColor="#CC55FF"/></linearGradient></defs></svg></div><h1 style={{margin:0,fontSize:44,fontWeight:900,letterSpacing:-1.5,background:"linear-gradient(90deg,#CC55FF,#9B59FF 45%,#55CCFF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{T.appName}</h1><p style={{margin:"10px 0 44px",color:"rgba(235,235,245,0.4)",fontSize:12,letterSpacing:3.5,textTransform:"uppercase"}}>{T.tagline}</p><div style={{width:220}}><div style={{height:4,background:"rgba(255,255,255,0.07)",borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,borderRadius:4,transition:"width 0.1s linear",background:"linear-gradient(90deg,#2D7FF9,#9B59FF,#CC55FF)"}}/></div><p style={{margin:"12px 0 0",color:"rgba(255,255,255,0.2)",fontSize:12,textAlign:"center"}}>{T.splashLoading}</p></div></div></div>);
}


function Onboarding({onDone,T}){
  const[sel,setSel]=useState([]);const toggle=s=>setSel(p=>p.includes(s)?p.filter(x=>x!==s):[...p,s]);
  return(<div style={{position:"fixed",inset:0,background:"linear-gradient(175deg,#04020E,#0C0620 55%,#040510)",overflowY:"auto",fontFamily:"inherit",zIndex:9000}}><div style={{padding:"60px 20px 100px",maxWidth:480,margin:"0 auto"}}><div style={{textAlign:"center",marginBottom:28}}><div style={{fontSize:52,marginBottom:12}}>🎧</div><h1 style={{color:"white",fontSize:24,fontWeight:900,margin:"0 0 8px"}}>{T.onboardingTitle}</h1><p style={{color:"rgba(255,255,255,0.35)",fontSize:14,margin:0}}>{T.onboardingSub}</p></div><div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginBottom:36}}>{GENRES.map(s=>{const on=sel.includes(s);const g=gc(s);return <button key={s} onClick={()=>toggle(s)} style={{padding:"11px 17px",borderRadius:26,border:`2px solid ${on?g.border:"rgba(255,255,255,0.1)"}`,background:on?g.bg:"rgba(255,255,255,0.04)",color:on?g.text:"rgba(255,255,255,0.55)",fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:7,transition:"all 0.2s"}}>{SEMOJI[s]||"🎵"} {s}</button>;})}</div><button onClick={()=>onDone(sel)} style={{width:"100%",padding:"16px",borderRadius:30,background:"linear-gradient(90deg,#7B4FFF,#9B69FF)",border:"none",color:"white",fontWeight:900,fontSize:16,cursor:"pointer",boxShadow:"0 8px 32px rgba(123,79,255,0.5)"}}>{T.enter}</button><button onClick={()=>onDone([])} style={{width:"100%",padding:"12px",background:"none",border:"none",color:"rgba(255,255,255,0.22)",fontSize:13,cursor:"pointer",marginTop:10}}>{T.skip}</button></div></div>);
}


function FavsTab({favs,onRemove,ct,T}){
  if(!favs.length)return <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32}}><div style={{fontSize:52,marginBottom:12}}>🎵</div><h2 style={{color:"white",fontSize:19,fontWeight:900,margin:"0 0 8px"}}>{T.myFavs}</h2><p style={{color:"rgba(255,255,255,0.3)",fontSize:13,textAlign:"center",lineHeight:1.6}}>{T.noFavsYet}</p></div>;
  return <div style={{flex:1,overflowY:"auto",padding:"14px 16px 24px"}}><h2 style={{color:"white",fontSize:18,fontWeight:900,margin:"0 0 12px"}}>{T.myFavs} ({favs.length})</h2>{favs.map(b=>{const g=gc(b.genre);return <div key={b.id} style={{display:"flex",alignItems:"center",gap:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:"10px 11px",marginBottom:9}}><div style={{width:50,height:50,borderRadius:12,background:SCENES[b.genre]?.bg?.split(",")[0]||"#050208",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{SEMOJI[b.genre]||"🎵"}</div><div style={{flex:1,minWidth:0}}><p style={{color:"white",fontSize:14,fontWeight:700,margin:"0 0 3px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.title}</p><div style={{display:"flex",gap:5,alignItems:"center"}}><span style={{color:"rgba(255,255,255,0.35)",fontSize:11}}>{b.producer}</span><span style={{background:g.bg,color:g.text,fontSize:9.5,fontWeight:700,padding:"2px 6px",borderRadius:7}}>{b.genre}</span></div></div><button onClick={()=>onRemove(b.id)} style={{background:"rgba(255,60,60,0.1)",border:"1px solid rgba(255,60,60,0.2)",color:"#FF5C8A",width:32,height:32,borderRadius:10,cursor:"pointer",fontSize:17,flexShrink:0}}>×</button></div>;})}</div>;
}

function PlaylistsTab({playlists,beats,onCreatePlaylist,ct,T,account,onRequireAuth}){
  const[showCreate,setShowCreate]=useState(false);const[name,setName]=useState("");const[type,setType]=useState("public");
  const create=()=>{const v=name.trim();if(!v)return;onCreatePlaylist(v,type);setName("");setShowCreate(false);};
  const handleCreateClick=()=>{if(!account){onRequireAuth("playlist");return;}setShowCreate(s=>!s);};
  return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto",padding:"14px 16px 24px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h2 style={{color:"white",fontSize:18,fontWeight:900,margin:0}}>{T.myPlaylists}</h2><button onClick={handleCreateClick} style={{padding:"8px 14px",borderRadius:20,background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:"white",fontSize:12,fontWeight:800,cursor:"pointer"}}>{T.createPlaylist}</button></div>{showCreate&&<div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:"14px",marginBottom:14,animation:"slideUp 0.2s ease"}}><input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&create()} placeholder={T.playlistName} style={{width:"100%",padding:"10px 13px",borderRadius:12,border:`1px solid ${ct.accent}44`,background:"rgba(255,255,255,0.05)",color:"white",fontSize:14,outline:"none",marginBottom:10}}/><div style={{display:"flex",gap:6,marginBottom:10}}>{[{k:"public",l:T.public,i:"🌍"},{k:"private",l:T.private,i:"🔒"},{k:"collab",l:T.collaborative,i:"🤝"}].map(o=><button key={o.k} onClick={()=>setType(o.k)} style={{flex:1,padding:"8px 4px",borderRadius:10,border:`1.5px solid ${type===o.k?ct.accent+"88":"rgba(255,255,255,0.1)"}`,background:type===o.k?`${ct.accent}18`:"rgba(255,255,255,0.04)",color:type===o.k?ct.accent:"rgba(255,255,255,0.4)",fontSize:11,fontWeight:700,cursor:"pointer"}}>{o.i} {o.l}</button>)}</div><div style={{display:"flex",gap:8}}><button onClick={create} style={{flex:1,padding:"10px",borderRadius:20,background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:"white",fontWeight:800,cursor:"pointer"}}>{T.save}</button><button onClick={()=>setShowCreate(false)} style={{flex:1,padding:"10px",borderRadius:20,background:"rgba(255,255,255,0.06)",border:"none",color:"rgba(255,255,255,0.5)",cursor:"pointer"}}>{T.cancel}</button></div></div>}{playlists.length===0?<div style={{textAlign:"center",padding:"40px 20px"}}><div style={{fontSize:44,marginBottom:10}}>🎶</div><p style={{color:"rgba(255,255,255,0.3)",fontSize:13,lineHeight:1.6}}>{T.newPlaylist}</p></div>:playlists.map(pl=><div key={pl.id} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:"14px",marginBottom:10}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:46,height:46,borderRadius:12,background:`linear-gradient(135deg,${ct.accent}33,${ct.accent2}22)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🎵</div><div style={{flex:1}}><p style={{color:"white",fontSize:14,fontWeight:800,margin:0}}>{pl.name}</p><div style={{display:"flex",gap:6,marginTop:3}}><span style={{color:"rgba(255,255,255,0.35)",fontSize:11}}>{pl.beatIds.length} sons</span><span style={{background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.4)",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:7}}>{pl.type==="private"?"🔒":pl.type==="collab"?"🤝":"🌍"} {pl.type==="private"?T.private:pl.type==="collab"?T.collaborative:T.public}</span></div></div></div></div>)}</div>);
}

function DownloadsTab({activity,beats,T,ct,onPlay}){
  const downloads=activity.downloads;
  if(!downloads.length)return <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32}}><div style={{fontSize:52,marginBottom:12}}>⬇️</div><h2 style={{color:"white",fontSize:19,fontWeight:900,margin:"0 0 8px"}}>{T.downloadsTab}</h2><p style={{color:"rgba(255,255,255,0.3)",fontSize:13,textAlign:"center",lineHeight:1.6}}>{T.noActivity}</p></div>;
  return(<div style={{flex:1,overflowY:"auto",padding:"14px 16px 24px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h2 style={{color:"white",fontSize:18,fontWeight:900,margin:0}}>{T.downloadsTab} ({downloads.length})</h2><span style={{background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.4)",fontSize:10.5,fontWeight:700,padding:"4px 10px",borderRadius:14}}>📲 {T.offlineAvailable}</span></div>{downloads.map((b,i)=>{const g=gc(b.genre);const idx=beats.findIndex(x=>x.id===b.id);return <div key={b.id+i} onClick={()=>idx>=0&&onPlay(idx)} style={{display:"flex",alignItems:"center",gap:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:"10px 11px",marginBottom:9,cursor:idx>=0?"pointer":"default"}}><div style={{width:50,height:50,borderRadius:12,background:SCENES[b.genre]?.bg?.split(",")[0]||"#050208",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,position:"relative"}}>{SEMOJI[b.genre]||"🎵"}<div style={{position:"absolute",bottom:-3,right:-3,width:18,height:18,borderRadius:"50%",background:"#00D48C",border:"2px solid #0A0718",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9}}>✓</div></div><div style={{flex:1,minWidth:0}}><p style={{color:"white",fontSize:14,fontWeight:700,margin:"0 0 3px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.title}</p><div style={{display:"flex",gap:5,alignItems:"center"}}><span style={{color:"rgba(255,255,255,0.35)",fontSize:11}}>{b.producer}</span><span style={{background:g.bg,color:g.text,fontSize:9.5,fontWeight:700,padding:"2px 6px",borderRadius:7}}>{b.genre}</span></div></div><span style={{color:"rgba(255,255,255,0.25)",fontSize:11}}>{fmt(b.duration)}</span></div>;})}</div>);
}


function NotificationsPanel({notifs,onMarkAll,ct,T}){
  const ICONS={like:"❤️",comment:"💬",follow:"👤",token:"🪙",promo:"👑",music:"🎵"};
  return(<div style={{flex:1,overflowY:"auto",padding:"14px 16px 24px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h2 style={{color:"white",fontSize:18,fontWeight:900,margin:0}}>{T.notifications}</h2><button onClick={onMarkAll} style={{background:"none",border:"none",color:ct.accent,fontSize:12,fontWeight:700,cursor:"pointer"}}>{T.markAllRead}</button></div>{notifs.length===0?<div style={{textAlign:"center",padding:"50px 20px"}}><div style={{fontSize:44,marginBottom:10}}>🔔</div><p style={{color:"rgba(255,255,255,0.3)",fontSize:13}}>{T.noNotifs}</p></div>:notifs.map(n=><div key={n.id} style={{display:"flex",gap:11,padding:"12px",borderRadius:14,marginBottom:8,background:n.read?"rgba(255,255,255,0.02)":"rgba(255,255,255,0.055)",border:`1px solid ${n.read?"rgba(255,255,255,0.05)":ct.accent+"22"}`}}><div style={{width:42,height:42,borderRadius:12,background:n.read?"rgba(255,255,255,0.06)":`${ct.accent}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{ICONS[n.type]||"🔔"}</div><div style={{flex:1,minWidth:0}}><p style={{color:"white",fontSize:13,fontWeight:n.read?400:700,margin:0,lineHeight:1.4}}>{n.text}</p><p style={{color:"rgba(255,255,255,0.3)",fontSize:10.5,margin:"4px 0 0"}}>{n.time}</p></div>{!n.read&&<div style={{width:8,height:8,borderRadius:"50%",background:ct.accent,flexShrink:0,marginTop:4,boxShadow:`0 0 8px ${ct.glow}`}}/>}</div>)}</div>);
}


function ProfileTab({favs,commentsMap,ct,premium,premiumUntil,onShowSettings,profile,tokens,joinDate,T,onWantPremium,account,activity}){
  const totalComments=Object.values(commentsMap).reduce((a,b)=>a+b.length,0);
  const fmtDate=d=>d?new Date(d).toLocaleDateString(undefined,{day:"2-digit",month:"long",year:"numeric"}):"";
  const totalPlays=activity?.played?.length||0;
  const dlCount=activity?.downloads?.length||0;
  return(<div style={{flex:1,overflowY:"auto",paddingBottom:24}}><div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 16px 16px"}}><div style={{position:"relative",marginBottom:12}}><div style={{width:90,height:90,borderRadius:"50%",background:`linear-gradient(135deg,${ct.accent},${ct.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,color:"white",fontWeight:900,border:premium?"3px solid #FFD700":`3px solid ${ct.accent}66`,boxShadow:premium?"0 4px 28px rgba(255,184,0,0.5)":`0 4px 28px ${ct.glow}`}}>{(profile.name||account?.name)?.[0]?.toUpperCase()||"🎵"}</div><div style={{position:"absolute",bottom:0,right:0,background:premium?"linear-gradient(135deg,#FFD700,#FFA500)":"linear-gradient(135deg,#555,#333)",borderRadius:20,padding:"3px 9px",border:"2px solid #0A0718",fontSize:10,fontWeight:800,color:premium?"#3a2a00":"#CCC"}}>{premium?"👑 PRO":"Free"}</div></div><h2 style={{color:"white",fontSize:21,fontWeight:900,margin:"0 0 4px"}}>{profile.name||account?.name||"Utilisateur"}</h2>{account?.country&&<span style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:16,padding:"3px 11px",fontSize:11.5,color:"rgba(255,255,255,0.6)",fontWeight:600,marginBottom:6}}>{account.country.flag} {account.country.name}</span>}{account?.email&&<p style={{color:"rgba(255,255,255,0.3)",fontSize:12,margin:"0 0 4px"}}>{account.email}</p>}{profile.bio&&<p style={{color:"rgba(255,255,255,0.4)",fontSize:13,margin:"0 0 6px",textAlign:"center"}}>{profile.bio}</p>}<button onClick={onShowSettings} style={{marginTop:10,padding:"9px 22px",borderRadius:22,background:`${ct.accent}18`,border:`1px solid ${ct.accent}44`,color:ct.accent2,fontSize:12,fontWeight:700,cursor:"pointer"}}>⚙️ {T.settings}</button></div>
  <div style={{padding:"0 16px 16px"}}>{premium?(<div style={{background:"linear-gradient(130deg,rgba(255,184,0,0.15),rgba(255,229,102,0.06))",border:"1px solid rgba(255,184,0,0.3)",borderRadius:20,padding:"16px 20px"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><span style={{fontSize:22}}>👑</span><span style={{color:"#FFD700",fontSize:15,fontWeight:900}}>{T.premiumActive}</span></div><p style={{color:"rgba(255,255,255,0.45)",fontSize:12,margin:0}}>{T.activeUntil} {fmtDate(premiumUntil)}</p></div>):(<button onClick={onWantPremium} style={{width:"100%",background:"linear-gradient(130deg,rgba(255,184,0,0.12),rgba(255,229,102,0.05))",border:"1px solid rgba(255,184,0,0.25)",borderRadius:20,padding:"16px 20px",textAlign:"left",cursor:"pointer"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><div><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:20}}>👑</span><span style={{color:"#FFD700",fontSize:15,fontWeight:900}}>{T.premium} · 8€/mois</span></div><p style={{color:"rgba(255,255,255,0.4)",fontSize:11.5,margin:0}}>{T.noAds} · {T.commercialLicense}</p></div><span style={{color:"#FFD700",fontSize:20}}>→</span></div></button>)}</div>
  <div style={{padding:"0 16px 16px"}}><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>{[{i:"⭐",l:T.favs,v:favs.length},{i:"💬",l:T.comments,v:totalComments},{i:"⬇️",l:T.downloads,v:dlCount},{i:"🎧",l:T.totalPlays,v:fmtN(totalPlays)},{i:"🪙",l:T.tokensEarned,v:tokens.earned},{i:"🪙",l:T.tokensSpent,v:tokens.spent}].map((s,idx)=><div key={idx} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:"12px 6px",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><span style={{fontSize:17}}>{s.i}</span><span style={{color:"white",fontSize:16,fontWeight:900}}>{s.v}</span><span style={{color:"rgba(255,255,255,0.28)",fontSize:9,fontWeight:600,textAlign:"center"}}>{s.l}</span></div>)}</div></div>
  <div style={{padding:"0 16px"}}><p style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontWeight:700,margin:"0 0 8px"}}>{T.memberSince}: {fmtDate(joinDate)}</p><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:0,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,overflow:"hidden"}}><div style={{padding:"8px 6px",borderRight:"1px solid rgba(255,255,255,0.05)",textAlign:"center"}}><span style={{color:"rgba(255,255,255,0.35)",fontSize:10,fontWeight:700}}>{T.feature}</span></div><div style={{padding:"8px 4px",borderRight:"1px solid rgba(255,255,255,0.05)",textAlign:"center"}}><span style={{color:"rgba(255,255,255,0.5)",fontSize:10,fontWeight:700}}>{T.free}</span></div><div style={{padding:"8px 4px",textAlign:"center"}}><span style={{color:"#FFD700",fontSize:10,fontWeight:800}}>👑</span></div>{[["🎧","✅","✅"],["⬇️","📺","⚡"],["🚫 Pub","Oui","Non"],["🎚️","Std","Max"],["💎","❌","✅"],["📱 Mono","❌","✅"],["📄 Lic","Perso","Comm."]].map((r,i)=><><div key={`a${i}`} style={{padding:"7px 6px",borderRight:"1px solid rgba(255,255,255,0.04)",borderTop:"1px solid rgba(255,255,255,0.04)",textAlign:"center"}}><span style={{color:"rgba(255,255,255,0.55)",fontSize:10}}>{r[0]}</span></div><div key={`b${i}`} style={{padding:"7px 4px",borderRight:"1px solid rgba(255,255,255,0.04)",borderTop:"1px solid rgba(255,255,255,0.04)",textAlign:"center"}}><span style={{color:"rgba(255,255,255,0.45)",fontSize:10}}>{r[1]}</span></div><div key={`c${i}`} style={{padding:"7px 4px",borderTop:"1px solid rgba(255,255,255,0.04)",textAlign:"center"}}><span style={{color:["✅","⚡","Non","Max","✅","✅","Comm."].includes(r[2])?"#4DFF99":"rgba(255,255,255,0.65)",fontSize:10,fontWeight:700}}>{r[2]}</span></div></>)}</div></div></div>);
}


function ProfileLocked({onSignup,ct,T}){
  return(<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,textAlign:"center"}}>
    <div style={{width:84,height:84,borderRadius:"50%",background:`${ct.accent}15`,border:`2px solid ${ct.accent}33`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={ct.accent} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    </div>
    <h2 style={{color:"white",fontSize:19,fontWeight:900,margin:"0 0 8px"}}>{T.profileLockedTitle}</h2>
    <p style={{color:"rgba(255,255,255,0.35)",fontSize:13,lineHeight:1.6,margin:"0 0 26px",maxWidth:280}}>{T.profileLockedSub}</p>
    <button onClick={onSignup} style={{padding:"14px 32px",borderRadius:28,background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:"white",fontWeight:800,fontSize:14,cursor:"pointer",boxShadow:`0 6px 24px ${ct.glow}`}}>{T.signUpNow}</button>
  </div>);
}


function SettingsPage({onBack,ct,T,theme,setTheme,langKey,setLangKey,profile,setProfile,premium,onWantPremium,onCancelPremium,accessibility,setAccessibility,onToast,onLogout,onShowHelp}){
  const[section,setSection]=useState(null);
  const[form,setForm]=useState({...profile});
  const[showDel,setShowDel]=useState(false);
  const inp={width:"100%",padding:"11px 13px",borderRadius:12,border:"1px solid rgba(255,255,255,0.09)",background:"rgba(255,255,255,0.05)",color:"white",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:10};

  if(section==="profile"){return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={()=>setSection(null)} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>{T.editProfile}</h2></div><div style={{padding:"18px"}}><div style={{display:"flex",justifyContent:"center",marginBottom:18}}><div style={{width:80,height:80,borderRadius:"50%",background:`linear-gradient(135deg,${ct.accent},${ct.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,color:"white",fontWeight:900,position:"relative",cursor:"pointer"}}>{form.name?.[0]?.toUpperCase()||"🎵"}<div style={{position:"absolute",bottom:0,right:0,width:26,height:26,borderRadius:"50%",background:ct.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,border:"2px solid #0A0718"}}>📷</div></div></div>{[{l:T.pseudo,k:"name",type:"text"},{l:T.email,k:"email",type:"email"},{l:T.password,k:"password",type:"password"},{l:T.bio,k:"bio",type:"text"}].map(f=><div key={f.k}><label style={{color:"rgba(255,255,255,0.3)",fontSize:10.5,fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:5}}>{f.l}</label>{f.k==="bio"?<textarea style={{...inp,height:72,resize:"none"}} value={form[f.k]||""} onChange={e=>setForm(x=>({...x,[f.k]:e.target.value}))}/>:<input type={f.type} style={inp} value={form[f.k]||""} onChange={e=>setForm(x=>({...x,[f.k]:e.target.value}))} placeholder={f.k==="password"?"••••••••":""}/>}</div>)}<button onClick={()=>{setProfile({...profile,...form});setSection(null);onToast("✅ Profil mis à jour !");}} style={{width:"100%",padding:"14px",borderRadius:28,background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:"white",fontWeight:800,fontSize:14,cursor:"pointer",boxShadow:`0 6px 22px ${ct.glow}`}}>{T.save}</button></div></div>);}

  if(section==="devices"){return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={()=>setSection(null)} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>{T.connectedDevices}</h2></div><div style={{padding:"16px"}}><div style={{background:"rgba(155,89,255,0.08)",border:`1px solid ${ct.accent}44`,borderRadius:16,padding:"14px",marginBottom:10}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:42,height:42,borderRadius:12,background:"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>📱</div><div style={{flex:1}}><p style={{color:"white",fontSize:13,fontWeight:700,margin:0}}>Cet appareil</p><p style={{color:"rgba(255,255,255,0.35)",fontSize:11,margin:"2px 0 0"}}>Session actuelle</p></div><span style={{background:`${ct.accent}22`,color:ct.accent,fontSize:10,fontWeight:800,padding:"3px 9px",borderRadius:20}}>Actuel</span></div></div></div></div>);}

  if(section==="history"){return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={()=>setSection(null)} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>{T.loginHistory}</h2></div><div style={{padding:"16px"}}><div style={{textAlign:"center",padding:"30px 10px"}}><div style={{fontSize:36,marginBottom:10}}>🔐</div><p style={{color:"rgba(255,255,255,0.3)",fontSize:13}}>{T.noActivity}</p></div></div></div>);}

  if(section==="language"){return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={()=>setSection(null)} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>{T.language}</h2></div><div style={{padding:"12px 16px"}}>{Object.entries(LANGS).map(([k,v])=><button key={k} onClick={()=>{setLangKey(k);setSection(null);}} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 14px",borderRadius:14,border:`1.5px solid ${langKey===k?ct.accent+"77":"rgba(255,255,255,0.07)"}`,background:langKey===k?`${ct.accent}12`:"rgba(255,255,255,0.02)",marginBottom:7,cursor:"pointer",textAlign:"left"}}><span style={{fontSize:22}}>{v.flag}</span><span style={{color:langKey===k?"white":"rgba(255,255,255,0.65)",fontSize:14,fontWeight:langKey===k?800:400,flex:1}}>{v.name}</span>{langKey===k&&<span style={{color:ct.accent,fontSize:16}}>✓</span>}</button>)}</div></div>);}

  if(section==="theme"){return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={()=>setSection(null)} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>🎨 {T.theme}</h2></div><div style={{padding:"16px",display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>{Object.entries(THEMES).map(([k,v])=>{const isOn=theme===k;return <button key={k} onClick={()=>{setTheme(k);setSection(null);}} style={{padding:"16px 12px",borderRadius:16,background:`${v.accent}10`,border:`2px solid ${isOn?v.accent:v.accent+"20"}`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:9,boxShadow:isOn?`0 0 24px ${v.glow}`:"none",transition:"all 0.2s"}}><div style={{width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg,${v.accent},${v.accent2})`,boxShadow:`0 4px 14px ${v.glow}`}}/><span style={{color:isOn?v.accent:"rgba(255,255,255,0.5)",fontSize:12,fontWeight:700,textAlign:"center"}}>{v.name}</span>{isOn&&<span style={{color:v.accent,fontSize:14}}>✓</span>}</button>;})}    </div></div>);}

  if(section==="accessibility"){return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={()=>setSection(null)} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>{T.accessibility}</h2></div><div style={{padding:"16px"}}>{[{k:"reduceAnim",l:T.reduceAnimations,i:"🎞️"},{k:"largeText",l:T.textSize+" (Grand)",i:"🔤"},{k:"darkMode",l:T.darkMode,i:"🌑"}].map(o=><div key={o.k} style={{display:"flex",alignItems:"center",gap:12,padding:"14px",borderRadius:14,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",marginBottom:9}}><span style={{fontSize:20}}>{o.i}</span><span style={{color:"white",fontSize:14,fontWeight:600,flex:1}}>{o.l}</span><button onClick={()=>setAccessibility(a=>({...a,[o.k]:!a[o.k]}))} style={{width:48,height:26,borderRadius:13,background:accessibility[o.k]?`linear-gradient(90deg,${ct.accent},${ct.accent2})`:"rgba(255,255,255,0.1)",border:"none",cursor:"pointer",position:"relative",transition:"background 0.3s"}}><div style={{width:22,height:22,borderRadius:"50%",background:"white",position:"absolute",top:2,left:accessibility[o.k]?24:2,transition:"left 0.3s",boxShadow:"0 1px 4px rgba(0,0,0,0.4)"}}/></button></div>)}</div></div>);}

  const GROUPS=[
    {title:T.editProfile,items:[{l:T.pseudo+" · "+T.email,i:"👤",k:"profile"},{l:T.connectedDevices,i:"📱",k:"devices"},{l:T.loginHistory,i:"🔐",k:"history"}]},
    {title:"Application",items:[{l:T.language,i:"🌍",k:"language"},{l:T.theme,i:"🎨",k:"theme"},{l:T.accessibility,i:"♿",k:"accessibility"},{l:T.help,i:"❓",k:"help"}]},
    {title:"Compte",items:[{l:premium?"Premium actif":"Passer Premium 8€/mois",i:"👑",k:"premium"},{l:T.logout,i:"🚪",k:"logout",danger:false},{l:T.deleteAccount,i:"🗑️",k:"delete",danger:true}]},
  ];
  return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={onBack} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>{T.settings}</h2></div><div style={{padding:"12px 16px 24px"}}>{GROUPS.map((g,gi)=><div key={gi} style={{marginBottom:22}}><p style={{color:"rgba(255,255,255,0.3)",fontSize:10.5,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"0 0 8px"}}>{g.title}</p>{g.items.map(item=><button key={item.k} onClick={()=>{if(item.k==="logout"){onLogout();}else if(item.k==="delete"){setShowDel(true);}else if(item.k==="premium"){onWantPremium();}else if(item.k==="help"){onShowHelp();}else{setSection(item.k);}}} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 14px",borderRadius:14,border:"1px solid rgba(255,255,255,0.06)",background:"rgba(255,255,255,0.03)",marginBottom:7,cursor:"pointer",textAlign:"left"}}><span style={{fontSize:19}}>{item.i}</span><span style={{color:item.danger?"#FF5C8A":item.k==="premium"?"#FFD700":"rgba(255,255,255,0.85)",fontSize:14,fontWeight:item.k==="premium"?800:500,flex:1}}>{item.l}</span><span style={{color:"rgba(255,255,255,0.25)",fontSize:18}}>›</span></button>)}</div>)}</div>
  {showDel&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",backdropFilter:"blur(10px)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}><div style={{background:"#0A0718",border:"1px solid rgba(255,60,60,0.3)",borderRadius:22,padding:24,width:"100%",maxWidth:320,textAlign:"center"}}><div style={{fontSize:40,marginBottom:12}}>⚠️</div><h3 style={{color:"white",fontSize:18,fontWeight:900,margin:"0 0 8px"}}>{T.deleteConfirm}</h3><p style={{color:"rgba(255,255,255,0.4)",fontSize:13,margin:"0 0 20px"}}>{T.deleteWarning}</p><button onClick={()=>{setShowDel(false);onToast("Compte supprimé");}} style={{width:"100%",padding:"13px",borderRadius:26,background:"linear-gradient(90deg,#FF2244,#FF5C8A)",border:"none",color:"white",fontWeight:900,fontSize:14,cursor:"pointer",marginBottom:9}}>{T.confirmDelete}</button><button onClick={()=>setShowDel(false)} style={{width:"100%",padding:"11px",background:"none",border:"none",color:"rgba(255,255,255,0.4)",fontSize:13,cursor:"pointer"}}>{T.cancel}</button></div></div>}</div>);
}


function HelpPage({onBack,ct,T}){
  const[openFaq,setOpenFaq]=useState(null);
  const[sent,setSent]=useState(false);
  const[msg,setMsg]=useState("");
  return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={onBack} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>{T.help}</h2></div><div style={{padding:"16px 16px 32px"}}>
  <p style={{color:"rgba(255,255,255,0.3)",fontSize:10.5,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"0 0 10px"}}>FAQ</p>{T.faqItems.map((f,i)=><div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,marginBottom:8,overflow:"hidden"}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 14px",background:"none",border:"none",color:"white",fontSize:13,fontWeight:700,cursor:"pointer",textAlign:"left",gap:10}}><span>{f.q}</span><span style={{color:ct.accent,fontSize:16,flexShrink:0,transition:"transform 0.2s",transform:openFaq===i?"rotate(180deg)":"none"}}>⌄</span></button>{openFaq===i&&<div style={{padding:"0 14px 13px",borderTop:"1px solid rgba(255,255,255,0.06)"}}><p style={{color:"rgba(255,255,255,0.55)",fontSize:12.5,margin:"10px 0 0",lineHeight:1.6}}>{f.a}</p></div>}</div>)}
  <p style={{color:"rgba(255,255,255,0.3)",fontSize:10.5,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"22px 0 10px"}}>{T.contactSupport}</p>
  {sent?<div style={{background:"rgba(0,212,140,0.1)",border:"1px solid rgba(0,212,140,0.3)",borderRadius:14,padding:"16px",textAlign:"center"}}><div style={{fontSize:32,marginBottom:8}}>✅</div><p style={{color:"#00D48C",fontSize:14,fontWeight:800,margin:0}}>Message envoyé !</p><p style={{color:"rgba(255,255,255,0.4)",fontSize:12,margin:"4px 0 0"}}>Nous répondrons sous 24h.</p></div>:<div><textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Décrivez votre problème…" style={{width:"100%",padding:"12px 13px",borderRadius:14,border:"1px solid rgba(255,255,255,0.09)",background:"rgba(255,255,255,0.04)",color:"white",fontSize:13,outline:"none",resize:"none",height:90,boxSizing:"border-box",fontFamily:"inherit",marginBottom:10}}/><button onClick={()=>{if(msg.trim())setSent(true);}} style={{width:"100%",padding:"13px",borderRadius:26,background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:"white",fontWeight:800,fontSize:14,cursor:"pointer"}}>Envoyer</button></div>}
  <p style={{color:"rgba(255,255,255,0.3)",fontSize:10.5,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"22px 0 10px"}}>Légal</p>{[{l:T.termsOfUse,i:"📋"},{l:T.privacyPolicy,i:"🔒"},{l:T.reportProblem,i:"🚨"}].map((r,i)=><button key={i} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 14px",borderRadius:14,border:"1px solid rgba(255,255,255,0.06)",background:"rgba(255,255,255,0.03)",marginBottom:7,cursor:"pointer"}}><span style={{fontSize:18}}>{r.i}</span><span style={{color:"rgba(255,255,255,0.7)",fontSize:14,flex:1,textAlign:"left"}}>{r.l}</span><span style={{color:"rgba(255,255,255,0.2)"}}>›</span></button>)}</div></div>);
}

export default function App(){
  const[phase,setPhase]=useState("splash");
  const[langKey,setLangKey]=useState("fr");
  const T=LANGS[langKey]?.t||LANGS.fr.t;
  const[tab,setTab]=useState("feed");
  const[cur,setCur]=useState(0);
  const[beats,setBeats]=useState(INIT);
  const[favs,setFavs]=useState([]);
  const[playlists,setPlaylists]=useState([]);
  const[profile,setProfile]=useState({name:"",bio:"",email:""});
  const[premium,setPremium]=useState(false);
  const[premiumUntil,setPremiumUntil]=useState(null);
  const[toast,setToast]=useState(null);
  const[theme,setTheme]=useState("violet");
  const[cmap,setCmap]=useState({});
  const[cbeat,setCbeat]=useState(null);
  const[playing,setPlaying]=useState(true);
  const[elapsed,setElapsed]=useState(0);
  const[showSearch,setShowSearch]=useState(false);
  const[searchHistory,setSearchHistory]=useState([]);
  const[adState,setAdState]=useState(null);
  const[showDl,setShowDl]=useState(null);
  const[showPremium,setShowPremium]=useState(false);
  const[showSettings,setShowSettings]=useState(false);
  const[showHelp,setShowHelp]=useState(false);
  const[account,setAccount]=useState(null);
  const[showSignup,setShowSignup]=useState(false);
  const[signupReason,setSignupReason]=useState(null);
  const[checkingSession,setCheckingSession]=useState(true);
  const[tokens,setTokens]=useState({earned:0,spent:0});
  const[joinDate,setJoinDate]=useState(null);
  const[accessibility,setAccessibility]=useState({reduceAnim:false,largeText:false,darkMode:true});
  const[notifs,setNotifs]=useState([]);
  const[activity,setActivity]=useState({played:[],downloads:[],favs:[],searches:[]});
  const feedCount=useRef(0);const nextAd=useRef(nextAdThreshold(0));const adCount=useRef(0);const pendingDl=useRef(null);
  const touchY=useRef(null);const loading=useRef(false);
  const[autoplay,setAutoplay]=useState(true);
  const ct=THEMES[theme]||THEMES.violet;
  const unreadNotifs=notifs.filter(n=>!n.read).length;
  const showToast=useCallback(m=>{setToast(m);setTimeout(()=>setToast(null),3000);},[]);
  const loadMore=useCallback(()=>{if(loading.current)return;loading.current=true;setTimeout(()=>{setBeats(b=>[...b,...Array.from({length:10},(_,i)=>makeBeat(b.length+i))]);loading.current=false;},300);},[]);

  const addTokens=useCallback((n)=>{setTokens(t=>({...t,earned:t.earned+n}));},[]);
  const goTo=(next)=>{
    if(next<0||next>=beats.length)return;
    const beat=beats[next];
    setCur(next);
    setActivity(a=>({...a,played:[beat,...a.played.filter(x=>x.id!==beat.id)].slice(0,20)}));
    if(next>=beats.length-3)loadMore();
    if(!premium){feedCount.current++;if(feedCount.current>=nextAd.current){feedCount.current=0;adCount.current++;nextAd.current=nextAdThreshold(adCount.current);setTimeout(()=>setAdState({reason:"feed"}),300);}}
  };
  // Autoplay : passe au suivant quand le son est terminé
  useEffect(()=>{
    if(!autoplay||!playing)return;
    const beat=beats[cur];
    if(!beat)return;
    if(elapsed>=beat.duration&&beat.duration>0){
      setElapsed(0);
      setPlaying(true);
      goTo(cur+1);
    }
  },[elapsed,autoplay,playing,cur,beats]);

  const onTS=e=>{touchY.current=e.touches[0].clientY;};
  const onTE=e=>{if(!touchY.current)return;const dy=touchY.current-e.changedTouches[0].clientY;if(dy>50)goTo(cur+1);if(dy<-50)goTo(cur-1);touchY.current=null;};
  const onW=e=>{if(e.deltaY>40)goTo(cur+1);if(e.deltaY<-40)goTo(cur-1);};
  const toggleFav=beat=>{setFavs(f=>{const has=f.some(x=>x.id===beat.id);const next=has?f.filter(x=>x.id!==beat.id):[beat,...f];setActivity(a=>({...a,favs:has?a.favs.filter(x=>x.id!==beat.id):[beat,...a.favs].slice(0,20)}));return next;});};
  const removeFav=id=>setFavs(f=>f.filter(x=>x.id!==id));
  const addCom=(bid,txt)=>setCmap(m=>({...m,[bid]:[...(m[bid]||[]),{id:Date.now(),user:"@vous",text:txt}]}));
  const createPlaylist=(name,type)=>setPlaylists(p=>[...p,{id:Date.now(),name,beatIds:[],type}]);
  const addToHistory=useCallback(beat=>{setSearchHistory(h=>[beat,...h.filter(x=>x.id!==beat.id)].slice(0,10));},[]);
  useEffect(()=>{const b=beats[cur];if(b)addToHistory(b);},[cur]);
  const handleDownload=(beat)=>{
    if(!account){pendingDl.current=beat;setSignupReason("download");setShowSignup(true);return;}
    if(premium){showToast(T.premiumDownload);setActivity(a=>({...a,downloads:[beat,...a.downloads.filter(x=>x.id!==beat.id)].slice(0,20)}));return;}
    pendingDl.current=beat;setShowDl(beat);
  };
  const requireAuth=(reason)=>{setSignupReason(reason);setShowSignup(true);};
  const handleSignupComplete=async(data)=>{
    const acc={name:data.name,email:data.email,country:data.country,provider:data.provider,joinedAt:new Date().toISOString()};
    setAccount(acc);
    setProfile(p=>({...p,name:data.name,email:data.email}));
    setJoinDate(new Date(acc.joinedAt));
    try{await window.storage.set("user_account_v1",JSON.stringify(acc));}catch{}
    setShowSignup(false);
    showToast(`${T.accountCreated} ${data.country.flag}`);
    if(signupReason==="download"&&pendingDl.current){
      const b=pendingDl.current;
      if(premium){showToast(T.premiumDownload);setActivity(a=>({...a,downloads:[b,...a.downloads.filter(x=>x.id!==b.id)].slice(0,20)}));pendingDl.current=null;}
      else setTimeout(()=>setShowDl(b),350);
    }
    setSignupReason(null);
  };
  const handleAdDone=()=>{const reason=adState?.reason;setAdState(null);if(reason==="download"&&pendingDl.current){const b=pendingDl.current;showToast(`⬇️ "${b.title}" ${T.downloaded}`);setActivity(a=>({...a,downloads:[b,...a.downloads.filter(x=>x.id!==b.id)].slice(0,20)}));pendingDl.current=null;}};
  const activatePremium=()=>{const d=new Date();d.setMonth(d.getMonth()+1);setPremium(true);setPremiumUntil(d);setShowPremium(false);showToast(T.premiumActivated);};
  const handleSplashDone=async()=>{
    try{
      const s=await window.storage.get("user_prefs_v2").catch(()=>null);
      const accRes=await window.storage.get("user_account_v1").catch(()=>null);
      const tokRes=await window.storage.get("user_tokens_v1").catch(()=>null);
      if(accRes?.value){try{const acc=JSON.parse(accRes.value);setAccount(acc);setProfile(p=>({...p,name:acc.name,email:acc.email}));if(acc.joinedAt)setJoinDate(new Date(acc.joinedAt));}catch{}}
      if(tokRes?.value){try{setTokens(JSON.parse(tokRes.value));}catch{}}
      try{
        const dbTracks=await sbSelect("tracks","&active=eq.true&order=uploaded_at.desc");
        if(dbTracks&&dbTracks.length>0){
          const realBeats=dbTracks.map(trackFromDb);
          setBeats(realBeats);
        }
      }catch(e){
        console.error("Erreur chargement Supabase:",e.message);
      }
      if(s?.value){const p=JSON.parse(s.value);if(p.theme)setTheme(p.theme);if(p.lang)setLangKey(p.lang);setPhase("app");}
      else setPhase("onboarding");
    }catch{setPhase("onboarding");}
  };
  const handleOnboardingDone=async(sel)=>{try{await window.storage.set("user_prefs_v2",JSON.stringify({genres:sel,theme,lang:langKey,onboarded:true}));}catch{}setPhase("app");};
  const handleLogout=async()=>{
    try{await window.storage.delete("user_account_v1");}catch{}
    setAccount(null);setPremium(false);setShowSettings(false);
    setTab("feed");
  };
  const markAllNotifs=()=>setNotifs(n=>n.map(x=>({...x,read:true})));
  useEffect(()=>{if(phase!=="app")return;window.storage.set("user_tokens_v1",JSON.stringify(tokens)).catch(()=>{});},[tokens,phase]);

  const fs=accessibility.largeText?1.15:1;
  const RA=accessibility.reduceAnim;

  if(phase==="splash")return <div style={{fontFamily:"'Inter',-apple-system,sans-serif",fontSize:`${fs*14}px`}}><style>{CSS}</style><Splash onDone={handleSplashDone} T={T}/></div>;
  if(phase==="onboarding")return <div style={{fontFamily:"'Inter',-apple-system,sans-serif",fontSize:`${fs*14}px`}}><style>{CSS}</style><Onboarding onDone={handleOnboardingDone} T={T}/></div>;

  const NAV=[
    {id:"feed",lbl:T.feed,icon:(a)=><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a?ct.accent:"rgba(255,255,255,0.3)"} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>},
    {id:"downloads",lbl:T.downloadsTab,icon:(a)=><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a?ct.accent:"rgba(255,255,255,0.3)"} strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>},
    {id:"favs",lbl:T.favs,icon:(a)=><svg width="21" height="21" viewBox="0 0 24 24" fill={a?ct.accent:"none"} stroke={a?ct.accent:"rgba(255,255,255,0.3)"} strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>},
    {id:"playlists",lbl:T.playlists,icon:(a)=><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a?ct.accent:"rgba(255,255,255,0.3)"} strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>},
    {id:"profil",lbl:T.profile,icon:(a)=><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a?ct.accent:"rgba(255,255,255,0.3)"} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>},
  ];

  const curBeat=beats[cur];

  // Settings / Help pages override
  if(showSettings)return(<div style={{width:"100%",height:"100dvh",background:"#030108",display:"flex",flexDirection:"column",fontFamily:"'Inter',-apple-system,sans-serif",fontSize:`${fs*14}px`,overflow:"hidden"}}><style>{CSS}</style>{toast&&<Toast msg={toast}/>}<SettingsPage onBack={()=>setShowSettings(false)} ct={ct} T={T} theme={theme} setTheme={setTheme} langKey={langKey} setLangKey={setLangKey} profile={profile} setProfile={setProfile} premium={premium} onWantPremium={()=>{setShowSettings(false);setShowPremium(true);}} onCancelPremium={()=>setPremium(false)} accessibility={accessibility} setAccessibility={setAccessibility} onToast={showToast} onLogout={handleLogout} onShowHelp={()=>{setShowSettings(false);setShowHelp(true);}}/></div>);
  if(showHelp)return(<div style={{width:"100%",height:"100dvh",background:"#030108",display:"flex",flexDirection:"column",fontFamily:"'Inter',-apple-system,sans-serif",fontSize:`${fs*14}px`,overflow:"hidden"}}><style>{CSS}</style><HelpPage onBack={()=>setShowHelp(false)} ct={ct} T={T}/></div>);

  return(
    <div style={{width:"100%",height:"100dvh",background:"#030108",display:"flex",flexDirection:"column",fontFamily:"'Inter',-apple-system,sans-serif",fontSize:`${fs*14}px`,overflow:"hidden",position:"relative"}}>
      <style>{CSS}</style>
      {toast&&<Toast msg={toast}/>}
      {adState&&<AdModal reason={adState.reason} onDone={handleAdDone} ct={ct} T={T}/>}
      {showDl&&<DownloadModal beat={showDl} premium={premium} onWatchAd={()=>{pendingDl.current=showDl;setShowDl(null);setAdState({reason:"download"});}} onClose={()=>setShowDl(null)} ct={ct} T={T}/>}
      {showPremium&&<PremiumModal onConfirm={activatePremium} onClose={()=>setShowPremium(false)} ct={ct} T={T}/>}
      {showSignup&&<SignupModal onComplete={handleSignupComplete} onClose={()=>{setShowSignup(false);pendingDl.current=null;setSignupReason(null);}} ct={ct} T={T} reason={signupReason}/>}
      {cbeat&&<CommentsModal beat={cbeat} comments={cmap[cbeat.id]||[]} onAdd={txt=>addCom(cbeat.id,txt)} onClose={()=>setCbeat(null)} ct={ct} T={T}/>}
      {showSearch&&<SearchOverlay beats={beats} history={searchHistory} onSelect={i=>{setCur(i);setTab("feed");}} onClose={()=>setShowSearch(false)} onAddHistory={addToHistory} ct={ct} T={T}/>}

      {/* TOP BAR */}
      {tab==="feed"&&<div style={{position:"absolute",top:0,left:0,right:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"50px 14px 12px",background:"linear-gradient(to bottom,rgba(0,0,0,0.55),transparent)",pointerEvents:"none"}}><div style={{display:"flex",alignItems:"center",gap:6,pointerEvents:"auto"}}><div style={{width:32,height:32,borderRadius:10,background:`linear-gradient(135deg,${ct.accent},${ct.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 14px ${ct.glow}`}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18V5l12-2v13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="6" cy="18" r="3" fill="white"/><circle cx="18" cy="16" r="3" fill="white"/></svg></div><span style={{color:"white",fontSize:17,fontWeight:900,letterSpacing:-0.5}}>{T.appName}</span></div><div style={{display:"flex",alignItems:"center",gap:9,pointerEvents:"auto"}}><div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(255,184,0,0.14)",border:"1px solid rgba(255,184,0,0.35)",borderRadius:18,padding:"6px 12px 6px 9px"}}><span style={{fontSize:14}}>🪙</span><span style={{color:"#FFD700",fontSize:12.5,fontWeight:800}}>{fmtN(tokens.earned)}</span></div><button onClick={()=>setAutoplay(a=>!a)} style={{display:"flex",alignItems:"center",gap:4,padding:"5px 8px",borderRadius:14,background:autoplay?"rgba(0,212,140,0.15)":"rgba(255,255,255,0.07)",border:`1px solid ${autoplay?"rgba(0,212,140,0.4)":"rgba(255,255,255,0.12)"}`,cursor:"pointer"}}><span style={{fontSize:10}}>{autoplay?"🔁":"⏹"}</span><span style={{color:autoplay?"#00D48C":"rgba(255,255,255,0.4)",fontSize:9.5,fontWeight:800,letterSpacing:0.5}}>Auto</span></button><button onClick={()=>setShowSearch(true)} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.1)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button><button onClick={()=>setTab("notifs")} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.1)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative"}}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>{unreadNotifs>0&&<div style={{position:"absolute",top:6,right:6,width:9,height:9,borderRadius:"50%",background:"#FF2244",border:"1.5px solid #030108"}}/>}</button></div></div>}

      {tab!=="feed"&&tab!=="notifs"&&curBeat&&<MiniPlayer beat={curBeat} playing={playing} setPlaying={setPlaying} elapsed={elapsed} onBack={()=>setTab("feed")} ct={ct} T={T}/>}

      <div style={{flex:1,overflow:"hidden",position:"relative"}}>
        {tab==="feed"&&<div style={{width:"100%",height:"100%",position:"relative"}} onTouchStart={onTS} onTouchEnd={onTE} onWheel={onW}>{beats.map((beat,i)=><div key={beat.id} style={{position:"absolute",inset:0,transform:`translateY(${(i-cur)*100}%)`,transition:RA?"none":"transform 0.4s cubic-bezier(0.4,0,0.2,1)"}}><BeatCard beat={beat} nextBeat={beats[i+1]} isActive={i===cur} onToast={showToast} favs={favs} onFav={toggleFav} commentCount={(cmap[beat.id]||[]).length} onComment={b=>setCbeat(b)} onDownload={handleDownload} ct={ct} playing={i===cur?playing:false} setPlaying={i===cur?setPlaying:()=>{}} elapsed={i===cur?elapsed:0} setElapsed={i===cur?setElapsed:()=>{}} T={T} reduceAnim={RA} account={account} onRequireAuth={requireAuth} onTokens={addTokens}/></div>)}<div style={{position:"absolute",right:5,top:"50%",transform:"translateY(-50%)",display:"flex",flexDirection:"column",gap:4,zIndex:50}}>{beats.slice(Math.max(0,cur-4),cur+6).map((_,i)=>{const idx=Math.max(0,cur-4)+i;return <div key={idx} style={{width:idx===cur?3.5:2,height:idx===cur?22:5,borderRadius:4,background:idx===cur?ct.accent:"rgba(255,255,255,0.2)",transition:RA?"none":"all 0.3s",boxShadow:idx===cur?`0 0 7px ${ct.glow}`:"none"}}/>;})}</div></div>}
        {tab==="downloads"&&<div style={{height:"100%",display:"flex",flexDirection:"column",paddingTop:10}}><DownloadsTab activity={activity} beats={beats} T={T} ct={ct} onPlay={i=>{setCur(i);setTab("feed");}}/></div>}
        {tab==="favs"&&<div style={{height:"100%",display:"flex",flexDirection:"column",paddingTop:10}}><FavsTab favs={favs} onRemove={removeFav} ct={ct} T={T}/></div>}
        {tab==="playlists"&&<div style={{height:"100%",display:"flex",flexDirection:"column",paddingTop:10}}><PlaylistsTab playlists={playlists} beats={beats} onCreatePlaylist={createPlaylist} ct={ct} T={T} account={account} onRequireAuth={requireAuth}/></div>}
        {tab==="notifs"&&<div style={{height:"100%",display:"flex",flexDirection:"column",paddingTop:10}}><NotificationsPanel notifs={notifs} onMarkAll={markAllNotifs} ct={ct} T={T}/></div>}
        {tab==="profil"&&<div style={{height:"100%",display:"flex",flexDirection:"column",paddingTop:4}}>{account?<ProfileTab favs={favs} commentsMap={cmap} ct={ct} premium={premium} premiumUntil={premiumUntil} onShowSettings={()=>setShowSettings(true)} profile={profile} tokens={tokens} joinDate={joinDate} T={T} onWantPremium={()=>setShowPremium(true)} account={account} activity={activity}/>:<ProfileLocked onSignup={()=>requireAuth("profile")} ct={ct} T={T}/>}</div>}
      </div>

      <div style={{display:"flex",background:"rgba(3,1,8,0.98)",borderTop:"1px solid rgba(255,255,255,0.05)",backdropFilter:"blur(26px)",paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
        {NAV.map(n=>{const a=tab===n.id;return <button key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,padding:"11px 0 9px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,position:"relative"}}>{n.icon(a)}<span style={{fontSize:9,fontWeight:700,letterSpacing:0.5,color:a?ct.accent:"rgba(255,255,255,0.27)",transition:"color 0.2s"}}>{n.lbl}</span>{a&&<div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:16,height:2,borderRadius:2,background:ct.accent,boxShadow:`0 0 8px ${ct.glow}`}}/>}</button>;})}
      </div>
    </div>
  );
}