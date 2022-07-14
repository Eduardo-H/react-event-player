import { useNavigate } from 'react-router-dom';
import { CircleNotch } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classnames from 'classnames';

import { useCreateSubscriberMutation } from '../graphql/generated';
import { Logo } from '../components/Logo';
import { Footer } from '../components/Footer';

interface SubscribeFormData {
  name: string;
  email: string;
}

const subscribeFormSchema = yup.object({
  name: yup.string().required('This field is required'),
  email: yup.string().required('This field is required'),
}).required();

export function Subscribe() {
  const navigate = useNavigate();
  const [createSubscriber, { loading }] = useCreateSubscriberMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<SubscribeFormData>({
    resolver: yupResolver(subscribeFormSchema)
  });

  const handleSubscribe = async (data: SubscribeFormData) => {
    console.log(data);
    
    // await createSubscriber({
    //   variables: {
    //     name,
    //     email
    //   }
    // });

    // navigate('/event');
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
          <strong className="text-2xl mb-6 block">
            Subscribe for free
          </strong>

          <form onSubmit={handleSubmit(handleSubscribe)} className="flex flex-col gap-2 w-full">
            <div>
              <input 
                className={classnames('bg-gray-900 rounded px-5 h-14 focus:outline-none focus:ring-1', {
                  'focus:border-red-500 focus:ring-red-500': errors.name,
                  'focus:border-green-500 focus:ring-green-500': !errors.name
                })}
                type="text" 
                placeholder="Your full name"
                {...register('name')}
              />
              <p className="text-xs text-red-500 mt-1">
                {errors.name?.message}
              </p>
            </div>
            
            <div>
              <input 
                className={classnames('bg-gray-900 rounded px-5 h-14 focus:outline-none focus:ring-1', {
                  'focus:border-red-500 focus:ring-red-500': errors.email,
                  'focus:border-green-500 focus:ring-green-500': !errors.email
                })}
                type="email" 
                placeholder="Type your e-mail"
                {...register('email')}
              />
              <p className="text-xs text-red-500 mt-1">
                {errors.email?.message}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 uppercase mt-4 py-4 rounded font-bold text-sm hover:bg-green-300 transition-colors disabled:opacity-50"
            >
              { loading 
                ? (
                  <CircleNotch size={20} className="animate-spin mx-auto" />
                ) : (
                  <span>Subscribe now</span>
              )}
            </button>
          </form>
        </div>
      </div>

      <img src="/src/assets/code-mockup.png" className="mt-10" alt="Code mockup" />

      <Footer />
    </div>
  );
}