export default function files(codeSnippets, template) {
  return codeSnippets.reduce((result, codeSnippet) => {
    if (codeSnippet.type !== 'pre') {
      return result;
    }

    const { props } = codeSnippet.props.children;
    let filePath; // path in the folder structure
    let fileHidden = false; // if the file is available as a tab
    let fileActive = false; // if the file tab is shown by default
    let fileReadonly = false;

    if (props.meta) {
      // get our metadata from the prop
      const [name, ...params] = props.meta.split(' ');
      filePath = (template === 'react' ? '/' : '/src/') + name;

      if (params.includes('hidden')) {
        fileHidden = true;
      }
      if (params.includes('active')) {
        fileActive = true;
      }
      if (params.includes('readonly')) {
        fileReadonly = true;
      }
    } else {
      // if no name is given to the file, we give them defaults based on
      // the language
      if (props.className === 'language-js') {
        filePath = '/App.js';
      } else if (props.className === 'language-css') {
        filePath = '/styles.css';
      } else if (props.className === 'language-vue') {
        filePath = '/src/App.vue';
      } else {
        throw new Error(`Code block is missing a filename: ${props.children}`);
      }
    }

    if (result[filePath]) {
      throw new Error(
        `File ${filePath} was defined multiple times. Each file snippet should have a unique path name`
      );
    }

    result[filePath] = {
      code: props.children,
      hidden: fileHidden,
      active: fileActive,
      readonly: fileReadonly,
    };
    return result;
  }, {});
}
