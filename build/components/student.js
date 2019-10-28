export function renderStudent(student) {
    return `
        <tr class="student">
            <td class="student__id">
                ${student.id}
            </td>
            
            <td class="student__name">
                ${student.name}
            </td>
            
            <td class="student__year">
                ${student.year}
            </td>
        </tr>
    `;
}
