module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/secciones-empresa',
        permanent: true,
      },
    ]
  },
}