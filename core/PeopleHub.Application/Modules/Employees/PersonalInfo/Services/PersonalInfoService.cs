using PeopleHub.Application.Modules.Employees.PersonalInfo.DTOs;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Interfaces;

namespace PeopleHub.Application.Modules.Employees.PersonalInfo.Services;

public sealed class PersonalInfoService : IPersonalInfoService
{
    private readonly IPersonalInfoRepository personalInfoRepository;

    public PersonalInfoService(IPersonalInfoRepository personalInfoRepository)
    {
        this.personalInfoRepository = personalInfoRepository;
    }

    public Task<PersonalInfoSaveResponseDto> SaveAsync(
        PersonalInfoSaveRequestDto request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        return personalInfoRepository.SaveAsync(request, cancellationToken);
    }
}