import WebViewer from '@pdftron/webviewer'
import { CollabClient } from '@pdftron/collab-client'

WebViewer(
  {
    path: '/public/webviewer'
  }, 
  document.getElementById('viewer')
).then(async instance => {

  const client = new CollabClient({
    instance,
    url: `http://localhost:3000`,
    subscriptionUrl: `ws://localhost:3000/subscribe`
  })

  const user = await client.loginAnonymously('PDFTron');

  const filePath = 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf';

  const createDocument = async () => {
    const document = await user.createDocument({
      document: filePath,
      isPublic: true,
      name: 'document.pdf'
    });

    await document.view(filePath);
  }

  document.getElementById('my-button').onclick = createDocument;

  const publicDocPaginator = user.getPublicDocumentPaginator({ limit: 1 });
  const publicDocuments = await publicDocPaginator.next();

  publicDocuments.forEach(async document => {
    if(await document.canJoin()) {
      await document.join()
    }
  })

  const documents = await user.getAllDocuments();
  if(documents.length > 0) {
    const mostRecentDocument = documents[0];
    await mostRecentDocument.view(filePath);
  }

});