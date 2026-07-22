using PeopleHub.Application.Modules.Employees.PersonalInfo.DTOs;

namespace PeopleHub.Application.Modules.Employees.PersonalInfo.Interfaces;

public interface IPersonalInfoService
{
    Task<PersonalInfoSaveResponseDto> SaveAsync(
        PersonalInfoSaveRequestDto request,
        CancellationToken cancellationToken = default);
}