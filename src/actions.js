import { HttpError } from 'wasp/server'

export const createDocument = async ({ templateId, clientId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newDocument = await context.entities.Document.create({
    data: {
      templateId,
      clientId,
      createdById: context.user.id,
      status: 'RECOLECCION'
    }
  });

  return newDocument;
}

export const updateDocumentStatus = async ({ documentId, newStatus }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const document = await context.entities.Document.findUnique({
    where: { id: documentId }
  });
  if (!document) { throw new HttpError(404, 'Document not found') };

  // Check if the user has permission to update the document status
  if (context.user.role !== 'ADMIN' && context.user.id !== document.createdById) {
    throw new HttpError(403);
  }

  const updatedDocument = await context.entities.Document.update({
    where: { id: documentId },
    data: { status: newStatus }
  });

  return updatedDocument;
}
