interface IFile {
  deleteable: boolean;
  type: string;
  name: string;
  id: string;
  children: IFile[];
}

export { IFile };
