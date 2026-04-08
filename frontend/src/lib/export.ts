export const exportToMarkdown = (sopData: any) => {
  const content = `# ${sopData.title}\n\n${sopData.description || "Drafted via Forge"}\n\n` + 
    `## Steps\n${sopData.steps.map((s: any) => `${s.order || s.step_order}. ${s.action}\n   * ${s.context_notes || ''}`).join('\n')}\n\n` +
    `## Edge Cases\n${(sopData.edge_cases || []).map((e: any) => `* **IF** ${e.condition}\n  **THEN** ${e.resolution}`).join('\n')}`;
  
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${sopData.title.replace(/\s+/g, '_')}.md`;
  link.click();
};
