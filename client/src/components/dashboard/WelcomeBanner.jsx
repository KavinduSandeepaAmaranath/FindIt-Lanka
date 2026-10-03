function WelcomeBanner({ user }) {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
        Welcome back, {user.name.split(" ")[0]}!
      </h1>
      <p className="mt-2 text-sm text-slate-500 max-w-2xl">
        You have {user.pendingNotifications} pending notifications regarding
        your lost car keys. Most reported items in Colombo 03 are found
        within 48 hours.
      </p>
    </div>
  );
}

export default WelcomeBanner;
