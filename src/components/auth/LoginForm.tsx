
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { Shield } from 'lucide-react';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'asha' | 'asha_facilitator'>('asha');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (isSignUp) {
      const { error } = await signUp(email, password, { full_name: fullName, role });
      if (error) {
        console.error('Sign up error:', error);
        alert('Sign up failed: ' + error.message);
      } else {
        alert('Sign up successful! Please check your email for verification.');
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        console.error('Login error:', error);
        alert('Login failed: ' + error.message);
      }
    }
    
    setLoading(false);
  };

  const fillDemoCredentials = (userType: 'facilitator' | 'asha') => {
    if (userType === 'facilitator') {
      setEmail('facilitator@demo.com');
      setPassword('password123');
    } else {
      setEmail('asha@demo.com');
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-emerald-100 rounded-full w-fit">
            <Shield className="h-8 w-8 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-emerald-800">ASHA Dashboard</CardTitle>
          <p className="text-emerald-600">Community Health Management System</p>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <Button
              type="button"
              variant={!isSignUp ? "default" : "outline"}
              onClick={() => setIsSignUp(false)}
              className="flex-1"
            >
              Sign In
            </Button>
            <Button
              type="button"
              variant={isSignUp ? "default" : "outline"}
              onClick={() => setIsSignUp(true)}
              className="flex-1"
            >
              Sign Up
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'asha' | 'asha_facilitator')}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="asha">ASHA Worker</option>
                  <option value="asha_facilitator">ASHA Facilitator</option>
                </select>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (isSignUp ? 'Creating account...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>
          </form>

          {!isSignUp && (
            <div className="mt-4 space-y-2">
              <div className="text-sm text-center text-gray-600">
                <p>Quick fill demo accounts:</p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('facilitator')}
                  className="flex-1"
                >
                  Facilitator Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('asha')}
                  className="flex-1"
                >
                  ASHA Demo
                </Button>
              </div>
            </div>
          )}

          <div className="mt-4 text-xs text-center text-gray-500">
            <p>Create demo accounts using the sign up form above</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
