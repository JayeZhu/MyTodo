import { Card, Input, Button } from '@rneui/themed';
import to from 'await-to-js';
import React, { useState } from 'react';
import { login } from '../services/auth';

const Login = () => {
  const [name, setName] = useState('');

  const loginHandler = async () => {
    const [err, res] = await to(login(JSON.stringify({ name })));
  }

  return (
    <Card>
      <Input placeholder="事项" value={name} onChangeText={(value) => setName(value)} />
      <Button onPress={loginHandler}>登录</Button>
    </Card>
  );
}

export default Login;