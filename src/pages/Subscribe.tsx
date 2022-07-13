import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateSubscriberMutation } from '../graphql/generated';
import { Logo } from '../components/Logo';

export function Subscribe() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email
      }
    });

    navigate('/event');
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Build a <strong className="text-blue-500">complete application</strong>, from scratch, with <strong className="text-blue-500">React</strong>.
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            In only a week you will learn one of the most popular technologies and with high demand to access the best opportunities on the market.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Subscribe for free</strong>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
            <input 
              className="bg-gray-900 rounded px-5 h-14"
              type="text" 
              placeholder="Your full name"
              onChange={(event) => setName(event.target.value)}
            />
            <input 
              className="bg-gray-900 rounded px-5 h-14"
              type="email" 
              placeholder="Type your e-mail"
              onChange={(event) => setEmail(event.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 uppercase mt-4 py-4 rounded font-bold text-sm hover:bg-green-300 transition-colors disabled:opacity-50"
            >
              Subscribe now
            </button>
          </form>
        </div>
      </div>

      <img src="/src/assets/code-mockup.png" className="mt-10" alt="Code mockup" />
    </div>
  );
}