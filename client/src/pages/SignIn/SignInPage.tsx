// import React from 'react';
// import { Button, TextInput, PasswordInput, Group, Box, Title } from '@mantine/core';
// import { useAppDispatch } from '../../shared/lib/hooks';
// import { loginThunk } from '../../enteties/User/model/authThunk';
// import type { LoginForm } from '../../enteties/User/model/types';
// import './SignInPage.style.css';
// import { useNavigate } from 'react-router-dom';

// export default function SignInPage(): JSX.Element {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   return (
//     <div className="container">
//       <Box maw={400} mx="auto" className="center-text glowing-box">
//         <Title order={1} style={{ marginBottom: '40px' }}>
//           Войти
//         </Title>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             const formData = Object.fromEntries(new FormData(e.currentTarget));
//             void dispatch(loginThunk(formData as LoginForm));
//             navigate('/genres')
//           }}
//         >
//           <TextInput label="Email" placeholder="Email" name="email" className="input-style" />
//           <PasswordInput
//             label="Пароль"
//             placeholder="Пароль"
//             name="password"
//             mt="md"
//             className="input-style"
//           />

//           <Group mt="md" position="center">
//             <Button
//               type="submit"
//               variant="gradient"
//               gradient={{ from: '#ffcc00', to: '#ff9900', deg: 105 }}
//               radius="lg"
//               className="button-primary"
//             >
//               Войти
//             </Button>
//           </Group>
//         </form>
//       </Box>
//     </div>
//   );
// }

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput, PasswordInput, Group, Box, Title } from '@mantine/core';
import { useAppDispatch } from '../../shared/lib/hooks';
import { loginThunk } from '../../enteties/User/model/authThunk';
import type { LoginForm } from '../../enteties/User/model/types';
import './SignInPage.style.css';

export default function SignInPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="container">
      <Box maw={400} mx="auto" className="center-text glowing-box">
        <Title order={1} style={{ marginBottom: '40px' }}>
          Войти
        </Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.currentTarget));
            void dispatch(loginThunk(formData as LoginForm));
            navigate('/genres');
          }}
        >
          <TextInput label="Email" placeholder="Email" name="email" className="input-style" />
          <PasswordInput
            label="Пароль"
            placeholder="Пароль"
            name="password"
            mt="md"
            className="input-style"
          />

          <Group mt="md" position="center">
            <Button
              type="submit"
              variant="gradient"
              gradient={{ from: '#ffcc00', to: '#ff9900', deg: 105 }}
              radius="lg"
              className="button-primary"
            >
              Войти
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}
