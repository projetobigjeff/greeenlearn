import { useState } from "react";
import { Leaf, Users } from "lucide-react";
import Water from "../icons/Water";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AuthFormProps {
  onLogin: (email: string, password: string, role: string) => void;
  onRegister: (name: string, email: string, password: string, role: string) => void;
}

const AuthForm = ({ onLogin, onRegister }: AuthFormProps) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState("student");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRole, setRegisterRole] = useState("student");

  const handleLogin = () => {
    onLogin(loginEmail, loginPassword, loginRole);
  };

  const handleRegister = () => {
    onRegister(registerName, registerEmail, registerPassword, registerRole);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <h2 className="text-2xl font-bold">Bem-vindo ao GreenLearn</h2>
        <p className="text-sm text-muted-foreground">
          Entre ou cadastre-se para começar sua jornada ecológica
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input 
                id="login-email" 
                type="email" 
                placeholder="seu@email.com" 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="login-password">Senha</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <Input 
                id="login-password" 
                type="password" 
                placeholder="••••••••" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Perfil</Label>
              <RadioGroup 
                value={loginRole} 
                onValueChange={setLoginRole}
                className="grid grid-cols-3 gap-2"
              >
                <div className="flex flex-col items-center space-y-2 p-2 border rounded-md cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="student" id="login-student" className="sr-only" />
                  <Users className="h-5 w-5" />
                  <Label htmlFor="login-student" className="text-xs cursor-pointer">Aluno</Label>
                </div>
                <div className="flex flex-col items-center space-y-2 p-2 border rounded-md cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="teacher" id="login-teacher" className="sr-only" />
                  <Leaf className="h-5 w-5" />
                  <Label htmlFor="login-teacher" className="text-xs cursor-pointer">Professor</Label>
                </div>
                <div className="flex flex-col items-center space-y-2 p-2 border rounded-md cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="visitor" id="login-visitor" className="sr-only" />
                  <Water className="h-5 w-5" />
                  <Label htmlFor="login-visitor" className="text-xs cursor-pointer">Visitante</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleLogin}
              disabled={!loginEmail || !loginPassword}
            >
              Entrar
            </Button>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="register-name">Nome Completo</Label>
              <Input 
                id="register-name" 
                placeholder="Seu nome" 
                value={registerName} 
                onChange={(e) => setRegisterName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input 
                id="register-email" 
                type="email" 
                placeholder="seu@email.com" 
                value={registerEmail} 
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Senha</Label>
              <Input 
                id="register-password" 
                type="password" 
                placeholder="••••••••" 
                value={registerPassword} 
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Perfil</Label>
              <RadioGroup 
                value={registerRole} 
                onValueChange={setRegisterRole}
                className="grid grid-cols-3 gap-2"
              >
                <div className="flex flex-col items-center space-y-2 p-2 border rounded-md cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="student" id="register-student" className="sr-only" />
                  <Users className="h-5 w-5" />
                  <Label htmlFor="register-student" className="text-xs cursor-pointer">Aluno</Label>
                </div>
                <div className="flex flex-col items-center space-y-2 p-2 border rounded-md cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="teacher" id="register-teacher" className="sr-only" />
                  <Leaf className="h-5 w-5" />
                  <Label htmlFor="register-teacher" className="text-xs cursor-pointer">Professor</Label>
                </div>
                <div className="flex flex-col items-center space-y-2 p-2 border rounded-md cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="visitor" id="register-visitor" className="sr-only" />
                  <Water className="h-5 w-5" />
                  <Label htmlFor="register-visitor" className="text-xs cursor-pointer">Visitante</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleRegister}
              disabled={!registerName || !registerEmail || !registerPassword}
            >
              Cadastrar
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-sm text-center text-muted-foreground">
        Ao usar este app, você concorda com nossos{" "}
        <a href="#" className="underline text-primary">
          termos de serviço
        </a>
        .
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
