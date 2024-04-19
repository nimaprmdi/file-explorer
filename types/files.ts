interface IFile {
  deleteable: boolean;
  type: string;
  name: string;
  children: IFile[];
}

export { IFile };
