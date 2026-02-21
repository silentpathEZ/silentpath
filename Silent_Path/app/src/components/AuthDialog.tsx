import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/contexts/UserContext';
import { User, LogIn, UserPlus, LogOut, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AuthDialog() {
  const { user, isAuthenticated, login, register, logout, loginError, registerError, clearErrors } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', name: '', password: '' });
  const [activeTab, setActiveTab] = useState('login');

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      clearErrors();
      setLoginData({ email: '', password: '' });
      setRegisterData({ email: '', name: '', password: '' });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginData.email, loginData.password);
    if (success) {
      setIsOpen(false);
      setLoginData({ email: '', password: '' });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(registerData.email, registerData.name, registerData.password);
    if (success) {
      setIsOpen(false);
      setRegisterData({ email: '', name: '', password: '' });
    }
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut className="w-4 h-4 mr-1" />
          Выйти
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <User className="w-4 h-4 mr-1" />
          Войти
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Аккаунт SilentPath</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">
              <LogIn className="w-4 h-4 mr-1" />
              Вход
            </TabsTrigger>
            <TabsTrigger value="register">
              <UserPlus className="w-4 h-4 mr-1" />
              Регистрация
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Пароль</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <LogIn className="w-4 h-4 mr-1" />
                Войти
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Нет аккаунта?{' '}
                <button 
                  type="button"
                  className="text-blue-600 hover:underline" 
                  onClick={() => setActiveTab('register')}
                >
                  Зарегистрируйтесь
                </button>
              </p>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              {registerError && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{registerError}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="register-name">Имя</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Ваше имя"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Пароль</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Минимум 6 символов"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full">
                <UserPlus className="w-4 h-4 mr-1" />
                Зарегистрироваться
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Уже есть аккаунт?{' '}
                <button 
                  type="button"
                  className="text-blue-600 hover:underline" 
                  onClick={() => setActiveTab('login')}
                >
                  Войдите
                </button>
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
