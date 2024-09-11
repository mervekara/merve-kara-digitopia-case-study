import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://dev.digitopia.co/api/a2/:path*',
          },
          {
            source: '/industries',
            destination: 'http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8080/industries',
          },
          {
            source: '/countries',
            destination: 'http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8080/countries',
          },
          {
            source: '/organization/:organizationId/detail',
            destination: 'http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8181/organization/:organizationId/detail',
          },
          {
            source: '/impactRuns',
            destination: 'http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8484/impact-runs',
          },
          {
            source: '/impactrun/:id/recommendations',
            destination: 'http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8283/impact-run/:id/recommendations',
          },
        ];
      },
};
 
export default withNextIntl(nextConfig);