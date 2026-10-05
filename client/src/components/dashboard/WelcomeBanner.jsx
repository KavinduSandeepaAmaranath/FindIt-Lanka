function WelcomeBanner({ user: userProp }) {
  let storedUser = null;
  try {
    storedUser = JSON.parse(localStorage.getItem("user") || "null");
  } catch (e) {
    storedUser = null;
  }

  const user = userProp || storedUser;
  const firstName = user?.name ? user.name.split(" ")[0] : (user?.fullName ? user.fullName.split(" ")[0] : "User");

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
        Welcome back, {firstName}!
      </h1>
      <p className="mt-2 text-sm text-slate-500 max-w-2xl">
        Welcome to your FindIt-Lanka dashboard. Track your lost and found reports, view matches, and manage your account.
      </p>
    </div>
  );
}

export default WelcomeBanner;
