import { useEffect } from 'react';

import { Box } from '@chakra-ui/react';
import Prism from 'prismjs';

type CodeHighlightingProps = {
  code: string;
};

function CodeHighlighting({ code }: CodeHighlightingProps) {
  const language = code.slice(0, code.indexOf('\n'));
  const codeWithoutLanguage = code.replace(language, '').trim();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Box w="100%">
      <Box as="pre" w="100%" overflow="scroll">
        <Box as="code" className={`language-${language}`}>
          {codeWithoutLanguage.toString()}
        </Box>
      </Box>
    </Box>
  );
}

export default CodeHighlighting;
