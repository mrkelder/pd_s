async function router(server: any, { path: { resolve }, fs }: any) {
  server.get('/', (req: any, reply: any) => {
    fs.readFile(resolve('./package.json'), 'utf8' ,(err: any, data: string) => {
      reply.send(`Welcome to PD server ${JSON.parse(data).version}`);
    });
  });
}

export default router;