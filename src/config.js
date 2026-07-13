// ─── CONFIG SUPABASE ─────────────────────────────────────────────────────────
export const SUPABASE_URL = "https://zwftcovxxirzzqdmkymc.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_NTyCZ4iyHpO7kzvZRVGa6A_YEjsXPhU";

export async function sbRequest(path, options = {}) {
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

export const sbSelect = (table, query = "") => sbRequest(`${table}?select=*${query}`);
export const sbInsert = (table, row) => sbRequest(table, { method: "POST", body: JSON.stringify(row) });
export const sbUpdate = (table, id, patch) => sbRequest(`${table}?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(patch) });

export const trackFromDb = r => ({
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


