import { AxiosError } from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { destroyCookie, parseCookies } from 'nookies';

export function withSSRAuth(fn: GetServerSideProps) {

    return async (ctx: GetServerSidePropsContext) => {
        const cookies = parseCookies(ctx);

        if (!cookies['token_client']) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
        try {
            return await fn(ctx);
        } catch (err) {
            if (err instanceof AxiosError) {
                destroyCookie(ctx, 'token_client');
                destroyCookie(ctx, 'refresh_token');

                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    },
                };
            }

        }
    };
}
