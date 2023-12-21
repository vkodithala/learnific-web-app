def replace_placeholder_and_save_new_file(original_file_path, new_file_path, placeholder, replacement_text):
    # Read the original HTML file
    with open(original_file_path, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Replace the placeholder
    updated_html = html_content.replace(placeholder, replacement_text)

    # Save the updated HTML to a new file
    with open(new_file_path, 'w', encoding='utf-8') as file:
        file.write(updated_html)

# Usage
original_file_path = 'newsletter/emailify-template/index.html'
new_file_path = 'GeneratedNewsletters/newsletter.html'
replace_placeholder_and_save_new_file(original_file_path, new_file_path, '{{Introduction}}', 'Your introduction text here')