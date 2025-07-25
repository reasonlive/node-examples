import React, { useState } from 'react';
import {
  LoginPageProps,
  LoginFormTypes,
  useRouterContext,
  useLink,
  useRouterType,
  useLogin,
  useTranslate,
  useActiveAuthProvider,
} from '@refinedev/core';

type DivPropsType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type FormPropsType = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

type LoginProps = LoginPageProps<DivPropsType, DivPropsType, FormPropsType>;

export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title = undefined,
}) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === 'legacy' ? LegacyLink : Link;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const translate = useTranslate();

  const authProvider = useActiveAuthProvider();
  const { mutate: login } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const renderLink = (link: string, text?: string) => {
    return <ActiveLink to={link}>{text}</ActiveLink>;
  };

  const renderProviders = () => {
    if (providers) {
      return providers.map((provider) => (
        <div
          key={provider.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}
        >
          <button
            onClick={() =>
              login({
                providerName: provider.name,
              })
            }
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {provider?.icon}
            {provider.label ?? <label>{provider.label}</label>}
          </button>
        </div>
      ));
    }
    return null;
  };

  const content = (
    <div {...contentProps}>
      <h1 style={{ textAlign: 'center' }}>
        {translate('pages.login.title')}
      </h1>
      {renderProviders()}
      <hr />
      <form
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          login({ email, password, remember });
        }}
        {...formProps}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 25,
            width: "50%",
          }}
        >
          <label htmlFor="email-input">
            {translate('pages.login.fields.email')}
          </label>
          <input
            id="email-input"
            name="email"
            type="text"
            size={20}
            autoCorrect="off"
            spellCheck={false}
            autoCapitalize="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password-input">
            {translate('pages.login.fields.password')}
          </label>
          <input
            id="password-input"
            type="password"
            name="password"
            required
            size={20}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {rememberMe ?? (
            <>
              <label htmlFor="remember-me-input">
                {translate('pages.login.buttons.rememberMe')}
                <input
                  id="remember-me-input"
                  name="remember"
                  type="checkbox"
                  size={20}
                  checked={remember}
                  value={remember.toString()}
                  onChange={() => {
                    setRemember(!remember);
                  }}
                />
              </label>
            </>
          )}
          <br />

          <input
            type="submit"
            value={translate('pages.login.signin')}
          />

        </div>
      </form>
    </div>
  );

  return (
    <div {...wrapperProps}>
      {renderContent ? renderContent(content, title) : content}
    </div>
  );
};
