import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
  return (
    <div className="max-w-md mx-auto py-12">
      <div className="p-8 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl shadow-xl space-y-6">
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Button className="w-full">Sign In</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
